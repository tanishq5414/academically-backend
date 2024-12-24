import { GATEWAY } from './constants';
import { IGatewayConfig } from './types';

const adminAuth = {
  method: GATEWAY.MIDDLEWARE.AUTH_METHOD.CLIENT_AUTHENTICATION,
  options: {
    roles: [],
  },
};

const GatewayConfig: IGatewayConfig = {
  [GATEWAY.API]: {},
};

export default GatewayConfig;
