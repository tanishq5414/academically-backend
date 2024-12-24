import { z } from 'zod';
import { UserRole } from '../../../interfaces/enums';

export const SignUpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
  role: z.nativeEnum(UserRole).optional()
});

export const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.nativeEnum(UserRole).optional()
});

// Type inference from the schemas
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
