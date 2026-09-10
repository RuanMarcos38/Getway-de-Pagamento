import type { PaymentProvider } from './types.js';
import { env } from '../config.js';
import { AsaasProvider } from './asaas.js';
import { SandboxProvider } from './sandbox.js';
export const paymentProvider: PaymentProvider=env.PAYMENT_PROVIDER==='asaas'?new AsaasProvider():new SandboxProvider();
