export interface CPErrorParams {
  message: string;
  type?: string;
  stack?: any;
  code?: number;
  status?: number;
  errorInfo?: any;
}

export class BRError extends Error {
  type?: string;
  code?: number;
  status?: number;
  stack?: any;
  errorInfo?: any;

  constructor(data: CPErrorParams) {
    super();
    this.message = data.message || this.message;
    this.type = data.type;
    this.code = data.code;
    this.stack = data.stack || this.stack;
    this.status = data.status || this.status;
    this.errorInfo = data.errorInfo || this.errorInfo;
  }
}
