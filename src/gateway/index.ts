import { Application, Router } from "express"
import { errorHandler } from "../common/utils/handlers";
import { forEach, extend} from "lodash";
import { GatewayServiceConfig } from "./types";
import Services from "./services";
import GatewayConfig from "./config";
import _ from "lodash";

const initGateway = function(app: Application) {
    const gatewayRouter = initGatewayRouter();

    app.use("/v1", gatewayRouter);

    app.use(errorHandler);

};

const initGatewayRouter = function () {
    const globalRouter = Router();
  
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
        
      }
    });
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