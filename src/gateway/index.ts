import { SingletonKeys } from '../common/constants/singleton';
import Services from "./services";
import { forEach, extend, get } from "lodash";
import GatewayConfig, { publicPaths } from "./config";
import _ from "lodash";
import { InternalServerError } from "../common/constants/errors";
import { GATEWAY } from "./constants";
import { Application, Router } from 'express';
import { errorHandler } from '../common/utils/handlers';
import * as Singleton from '../singleton';
import { GatewayServiceConfig } from './types';
import { AuthMiddlewareConfig } from './types';
import { AuthMiddlewares } from './middlewares';
import { isClientAuthenticated } from './middlewares/auth/client_authnetication';

const initGateway = function(app: Application) {
    const gatewayRouter = initGatewayRouter();

    app.use("/api/v1", gatewayRouter);

    app.use(errorHandler);

};

const initGatewayRouter = function () {
    const globalRouter = Router();

    const gatewayConfig = getGatewayConfig();
    Singleton.addToSingleton(SingletonKeys.GATEWAY_CONFIG, gatewayConfig);
  
    globalRouter.use((req, res, next) => {
      if (req.url !== '/healthCheck') {
        console.log('Time: ', Date.now());
      }
      next();
    });
  
    globalRouter.get('/', function (req, res) {
      res.send('Welcome to Academically Global API Gateway');
    });
  
    // health check
    globalRouter.get('/healthCheck', (req: any, res: any) => res.send(true));
  
    const routerStack: Record<string, Router> = {};
  
    // Initialize service routers
    forEach(Services, (service: any, serviceName: any) => {
      const router = Router();
  
      initServiceEndpoints(service, router);
  
      routerStack[serviceName] = router;
    });
  
    // Attach service routers to global router
    forEach(routerStack, (router: any, service: any) => {
      console.log(`Initializing service: ${service}`);
      globalRouter.use(`/${service}`, router);
    });
  
    return globalRouter;
  };        

  const initServiceEndpoints = (service: any, router: Router, prefix = '') => {
    forEach(service, (method: any, methodName: any) => {
      let methodPath = prefix + '/' + methodName;
  
      if (typeof method == 'object') {
        initServiceEndpoints(method, router, methodPath);
      } else {
        initApiMiddlewares(router, methodPath, method); 
      }
    });
  };

  const initApiMiddlewares = (router: Router, methodPath: string, method: any) => {
    console.log(`Initializing service method: ${methodPath}`);
  
    // Initialize Pre-Api Middlewares
    initPreApiMiddlewares(router, methodPath);
  
    if(publicPaths.includes(methodPath)) {
      router.post(methodPath, (req: any, res: any, next: any) => {
        return method(req.body);
      });
    } else {
      router.post(methodPath, isClientAuthenticated, (req: any, res: any, next: any) => {
          req.body.userId = req.userId;
          return method(req, res, next);
      });
    }
  };
  
  const initPreApiMiddlewares = (router: Router, methodPath: string) => {
    // Init Auth Middlewares
    initAuthMiddleware(router, methodPath);
  };
  
  const initAuthMiddleware = (router: Router, methodPath: string) => {
    const gatewayConfig = Singleton.getSingleton()[SingletonKeys.GATEWAY_CONFIG];
    const authMiddlewareConfig = get(gatewayConfig, `${methodPath}.${GATEWAY.MIDDLEWARE.TYPE.AUTH}`);
  
    if (authMiddlewareConfig != null) {
      applyAuthMiddleware(router, methodPath, authMiddlewareConfig);
    }
  };
  
  const applyAuthMiddleware = (router: Router, methodPath: string, config: AuthMiddlewareConfig) => {
    const authFunction = AuthMiddlewares[config.method];
  
    if (!authFunction) {
      throw new InternalServerError('Wrong method passed in gateway config for auth middleware');
    }
  
    router.use(methodPath, authFunction);
  };

  function getGatewayConfig(): GatewayServiceConfig {
    let config = {};
    Object.keys(GatewayConfig).forEach((serviceKey) => {
      config = _.extend(config, GatewayConfig[serviceKey]);
    });
    return config;
  }

  export const Gateway = {
    initGateway,
  }