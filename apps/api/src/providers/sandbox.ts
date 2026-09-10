import crypto from 'node:crypto';
import type { PaymentProvider,ProviderCustomerInput,ProviderPaymentInput,ProviderSubscriptionInput,ProviderPaymentLinkInput,ProviderTransferInput } from './types.js';
export class SandboxProvider implements PaymentProvider{
 async createCustomer(_:ProviderCustomerInput){return{id:`cus_test_${crypto.randomUUID()}`}}
 async createPayment(input:ProviderPaymentInput){const id=`pay_test_${crypto.randomUUID()}`;return{id,status:'PENDING',invoiceUrl:`http://localhost:5173/pay/${id}`,bankSlipUrl:input.billingType==='BOLETO'?`http://localhost:5173/boleto/${id}`:undefined}}
 async getPixQrCode(id:string){return{payload:`00020126GETWAY-SANDBOX-${id}`,expirationDate:new Date(Date.now()+86400000).toISOString()}}
 async refundPayment(_:string){return}
 async createSubscription(_:ProviderSubscriptionInput){return{id:`sub_test_${crypto.randomUUID()}`,status:'ACTIVE'}}
 async createPaymentLink(_:ProviderPaymentLinkInput){const id=`plink_test_${crypto.randomUUID()}`;return{id,url:`http://localhost:5173/link/${id}`,active:true}}
 async createTransfer(_:ProviderTransferInput){return{id:`trf_test_${crypto.randomUUID()}`,status:'PENDING'}}
}
