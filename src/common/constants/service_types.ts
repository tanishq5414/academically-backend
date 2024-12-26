export enum HeaderFields {
  VersionName = 'x-version-name',
  DeviceId = 'x-device-id',
  DeviceOs = 'x-device-os',
  AuthId = 'auth-id',
}

export interface Headers {
  [HeaderFields.VersionName]: string;
  [HeaderFields.DeviceId]: string;
  [HeaderFields.DeviceOs]: string;
}

export enum CommonApiReqParamKeys {
  UserName = 'userName',
  UserId = 'userId',
  DeviceContext = 'deviceContext',
}

export type CommonDeviceContext = {
  deviceOs: string;
  appVersion: string;
  deviceId: string;
};

export type CommonRequestParams = {
  headers: Headers;
  userId?: string;
  deviceContext: CommonDeviceContext;
};
