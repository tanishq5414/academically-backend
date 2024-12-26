import { forEach, get } from 'lodash';
import { CommonApiReqParamKeys, CommonDeviceContext, HeaderFields, Headers } from '../constants/service_types';
import { ResponseHandler } from './handlers';

const COMMON_REQ_KEYS = [
  CommonApiReqParamKeys.DeviceContext,
];

const getCustomKeyFromHeaders = function (key: CommonApiReqParamKeys, headers: Headers) {
  switch (key) {
    case CommonApiReqParamKeys.UserId:
      return get(headers, HeaderFields.AuthId, null);
    case CommonApiReqParamKeys.DeviceContext: {
      const deviceContext: CommonDeviceContext = {
        deviceOs: headers[HeaderFields.DeviceOs],
        deviceId: headers[HeaderFields.DeviceId],
        appVersion: headers[HeaderFields.VersionName],
      };
      return deviceContext;
    }
    default:
      return null;
  }
};

const getReqParamsFromHeaders = function (keys: CommonApiReqParamKeys[], headers: Headers) {
  const reqParams: { [key in CommonApiReqParamKeys]?: any } = {};
  forEach(keys, (key: any) => {
    reqParams[key] = getCustomKeyFromHeaders(key, headers);
  });
  return reqParams;
};

const apiWrapper = function (api: any) {
  return async function (req: any, res: any, next: any) {
    try {
      // run controllers logic
      const reqParams = getReqParamsFromHeaders(COMMON_REQ_KEYS, req.headers);
      const apiParams = Object.assign({}, req.body, {
        ...reqParams,
      });
      const response = await api(apiParams);
      ResponseHandler.success(res, response);
    } catch (e) {
      console.log(e);
      // if an exception is raised, do not send any response
      // just continue performing the middleware chain
      next(e);
    }
  };
};

const wrapApiCollection = (apiCollection: any) => {
  const newCollection: { [key: string]: any } = {};
  forEach(apiCollection, (fn, key) => {
    if (typeof fn == 'object') {
      newCollection[key] = wrapApiCollection(fn);
    } else {
      newCollection[key] = apiWrapper(fn);
    }
  });
  return newCollection;
};

export const ServiceWrappers = {
  apiWrapper,
  wrapApiCollection,
};
