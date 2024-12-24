import { z } from 'zod';
import { UserRole } from '../../../interfaces/enums';

export const SignUpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
  role: z.nativeEnum(UserRole).optional().default(UserRole.USER)
});

export const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.nativeEnum(UserRole).optional()
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
export type SignInSchemaType = z.infer<typeof SignInSchema>;
