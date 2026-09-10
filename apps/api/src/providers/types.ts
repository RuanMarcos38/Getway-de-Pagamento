export type ProviderCustomerInput={name:string;email?:string;phone?:string;document?:string};
export type ProviderCustomer={id:string};
export type ProviderPaymentInput={customerId:string;billingType:'PIX'|'BOLETO'|'CREDIT_CARD'|'UNDEFINED';value:number;dueDate:string;description?:string;externalReference?:string};
export type ProviderPayment={id:string;status:string;invoiceUrl?:string;bankSlipUrl?:string};
export type PixData={payload:string;encodedImage?:string;expirationDate?:string};
export type ProviderSubscriptionInput={customerId:string;billingType:'PIX'|'BOLETO'|'CREDIT_CARD'|'UNDEFINED';value:number;nextDueDate:string;cycle:string;description?:string;externalReference?:string};
export type ProviderPaymentLinkInput={name:string;description?:string;value?:number;billingType:'PIX'|'BOLETO'|'CREDIT_CARD'|'UNDEFINED';chargeType:'DETACHED'|'RECURRENT'|'INSTALLMENT';subscriptionCycle?:string;maxInstallmentCount?:number};
export type ProviderTransferInput={value:number;pixAddressKey:string;pixAddressKeyType?:string;externalReference?:string};
export interface PaymentProvider{
  createCustomer(input:ProviderCustomerInput):Promise<ProviderCustomer>;
  createPayment(input:ProviderPaymentInput):Promise<ProviderPayment>;
  getPixQrCode(paymentId:string):Promise<PixData>;
  refundPayment(paymentId:string,value?:number):Promise<void>;
  createSubscription(input:ProviderSubscriptionInput):Promise<{id:string;status?:string}>;
  createPaymentLink(input:ProviderPaymentLinkInput):Promise<{id:string;url?:string;active?:boolean}>;
  createTransfer(input:ProviderTransferInput):Promise<{id:string;status?:string}>;
}
