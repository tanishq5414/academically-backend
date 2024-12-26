import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string(),
  ALLOWED_ORIGINS: z.string(),
});

export const env = envSchema.parse(process.env);
