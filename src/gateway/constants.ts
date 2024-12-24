export enum MiddlewareTypes {
  AUTH = 'auth',
}

export const GATEWAY = {
  MIDDLEWARE: {
    TYPE: MiddlewareTypes,
    AUTH_METHOD: {
      CLIENT_AUTHENTICATION: 'client_authentication',
      DASHBOARD_CLIENT_AUTHENTICATION: 'dashboard_client_authentication',
    },
  },
  API: 'api',
  DASHBOARD_API: 'dashboard_api',
};
