import { Types } from "mongoose";

export type TOrderStatus = "Pending" | "Paid" | "Cancelled";

export type TPaymentMethod = "COD" | "Stripe";

export type TOrderItems = {
  product: Types.ObjectId;
  quantity: number;
  price: number;
};

export type TOrder = {
  user: Types.ObjectId;
  items: TOrderItems[];
  totalPrice: number;
  trxId?: string;
  status: TOrderStatus;
  paymentMethod: TPaymentMethod;
  shippingAddress: string;
};
