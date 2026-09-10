import { env } from '../config.js';
import type { PaymentProvider,ProviderCustomerInput,ProviderPaymentInput,ProviderPayment,PixData,ProviderSubscriptionInput,ProviderPaymentLinkInput,ProviderTransferInput } from './types.js';
export class AsaasProvider implements PaymentProvider{
 private base=env.ASAAS_ENV==='production'?'https://api.asaas.com/v3':'https://api-sandbox.asaas.com/v3';
 private async request<T>(path:string,init:RequestInit={}):Promise<T>{
  if(!env.ASAAS_API_KEY) throw new Error('ASAAS_API_KEY não configurada');
  const r=await fetch(`${this.base}${path}`,{...init,headers:{'Content-Type':'application/json','access_token':env.ASAAS_API_KEY,...init.headers}});
  const body=await r.json().catch(()=>({})); if(!r.ok) throw new Error(`Asaas ${r.status}: ${JSON.stringify(body)}`); return body as T;
 }
 async createCustomer(input:ProviderCustomerInput){return this.request<{id:string}>('/customers',{method:'POST',body:JSON.stringify({name:input.name,email:input.email,mobilePhone:input.phone,cpfCnpj:input.document})})}
 async createPayment(input:ProviderPaymentInput){return this.request<ProviderPayment>('/payments',{method:'POST',body:JSON.stringify({customer:input.customerId,billingType:input.billingType,value:input.value,dueDate:input.dueDate,description:input.description,externalReference:input.externalReference})})}
 async getPixQrCode(id:string){return this.request<PixData>(`/payments/${id}/pixQrCode`)}
 async refundPayment(id:string,value?:number){await this.request(`/payments/${id}/refund`,{method:'POST',body:JSON.stringify(value?{value}:{})})}
 async createSubscription(input:ProviderSubscriptionInput){return this.request<{id:string;status?:string}>('/subscriptions',{method:'POST',body:JSON.stringify({customer:input.customerId,billingType:input.billingType,value:input.value,nextDueDate:input.nextDueDate,cycle:input.cycle,description:input.description,externalReference:input.externalReference})})}
 async createPaymentLink(input:ProviderPaymentLinkInput){return this.request<{id:string;url?:string;active?:boolean}>('/paymentLinks',{method:'POST',body:JSON.stringify(input)})}
 async createTransfer(input:ProviderTransferInput){return this.request<{id:string;status?:string}>('/transfers',{method:'POST',body:JSON.stringify({value:input.value,pixAddressKey:input.pixAddressKey,pixAddressKeyType:input.pixAddressKeyType,externalReference:input.externalReference})})}
}
