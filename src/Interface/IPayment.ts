import type { IBilling, IGetOrder } from "./IOrder";

export interface IPayment {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

export interface IAmount {
  totalPrice?: number;
  form?: IBilling;
  orders?: IGetOrder[];
}

export interface ICancel {
  orders: IGetOrder;
}

export interface IRefund {
  bankName: string;
  accountNumber: string;
  accountName: string;
  refundFee: number;
}




