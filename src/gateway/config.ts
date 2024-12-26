import { GATEWAY } from './constants';
import { IGatewayConfig } from './types';

const clientAuth = {
  method: GATEWAY.MIDDLEWARE.AUTH_METHOD.CLIENT_AUTHENTICATION,
  options: {
    roles: [],
  },
};

export const publicPaths = [
  '/healthCheck',
  '/',
  '/signIn',
  '/signUp'
];

const GatewayConfig: IGatewayConfig = {
  [GATEWAY.API]: {
    publicPaths,
    defaultAuth: clientAuth
  },
};

export default GatewayConfig;
