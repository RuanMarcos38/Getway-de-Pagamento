export type Summary={balance:number;pending:number;overdue:number;payments:number;customers:number};
export type Customer={id:string;name:string;email?:string};
export type Payment={id:string;amount:string;status:string;billingType:string;dueDate:string;description?:string;pixPayload?:string;customer:Customer};
export type Subscription={id:string;amount:string;status:string;billingType:string;cycle:string;nextDueDate:string;description?:string;customer:Customer};
export type PaymentLink={id:string;name:string;description?:string;value?:string;billingType:string;chargeType:string;url?:string;active:boolean};
export type Transfer={id:string;amount:string;pixAddressKey:string;pixAddressKeyType?:string;status:string;createdAt:string};
