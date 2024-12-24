import { BRError } from "../utils/errors";
import { ErrorType } from "./error_types";

export class InternalServerError extends BRError {
  constructor(message: string) {
    const _error = Object.assign({}, ErrorType.INTERNAL_SERVER_ERROR);
    _error.message += `: ${message}`;
    super(_error);
  }
}
export class InvalidRequestError extends BRError {
  constructor(reason: string) {
    const _error = Object.assign({}, ErrorType.INVALID_REQUEST);
    _error.message += `: ${reason}`;
    super(_error);
  }
}

export class EntityNotFoundError extends BRError {
  constructor(message: string) {
    const _error = Object.assign({}, ErrorType.ENTITY_NOT_FOUND);
    _error.message += `: ${message}`;
    super(_error);
  }
}