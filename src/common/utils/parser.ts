import { CPErrorParams } from './errors';

const errorResponse = function (err: CPErrorParams) {
  return {
    success: false,
    error: {
      type: err.type,
      message: err.message,
      status: err.status,
      code: err.code,
    },
  };
};

const successResponse = function (response: any) {
  return {
    success: true,
    data: {
      ...response,
    },
  };
};

export const ResponseWrapper = {
  success: successResponse,
  error: errorResponse,
};
