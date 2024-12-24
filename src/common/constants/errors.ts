import { BRError } from "../utils/errors";

export class InternalServerError extends BRError {
  constructor(message: string) {
    super({ message, status: 500 });
  }
}
export class InvalidRequestError extends BRError {
  constructor(reason: string) {
    const _error = Object.assign({}, ErrorType.INVALID_REQUEST);
    _error.message += `: ${reason}`;
    super(_error);
  }
}