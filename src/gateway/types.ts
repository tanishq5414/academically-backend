export type GatewayApiConfig = {
};

export type IGatewayConfig = Record<string, GatewayServiceConfig>;

export type GatewayServiceConfig = Record<string, GatewayApiConfig>;

export type AuthMiddlewareOptions = {
  roles: Array<string>;
};

export type AuthMiddlewareConfig = {
  method: string;
  options: AuthMiddlewareOptions;
};
