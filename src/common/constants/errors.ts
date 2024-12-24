import { BRError } from "../utils/errors";

export class InternalServerError extends BRError {
  constructor(message: string) {
    super({ message, status: 500 });
  }
}
