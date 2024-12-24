import { InvalidRequestError } from '../constants/errors';
import { z } from 'zod';

function validateSchema<T>(schema: z.ZodSchema<T>, params: any): T {
  const result = schema.safeParse(params);
  if (!result.success) {
    const errorPath = result.error.issues[0].path.join('.');
    const errorMessage = `Invalid request parameter: ${errorPath}`;
    throw new InvalidRequestError(errorMessage);
  }
  return result.data;
}

export const Validator = {
  validateSchema,
};
