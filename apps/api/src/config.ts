import 'dotenv/config';
import { z } from 'zod';
const schema = z.object({
  DATABASE_URL: z.string().min(1), PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().min(32), CORS_ORIGIN: z.string().default('http://localhost:5173'),
  PAYMENT_PROVIDER: z.enum(['sandbox','asaas']).default('sandbox'),
  ASAAS_ENV: z.enum(['sandbox','production']).default('sandbox'),
  ASAAS_API_KEY: z.string().optional(), ASAAS_WEBHOOK_TOKEN: z.string().min(16).default('change-this-webhook-token')
});
export const env = schema.parse(process.env);
