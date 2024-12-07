import { Types } from "mongoose";

export type TCartIncType = "increment" | "decrement";

export type TCartItem = {
  product: Types.ObjectId;
  quantity: number;
  cartIncType?: TCartIncType;
};

export type TCart = {
  user: Types.ObjectId;
  totalPrice: number;
  items: TCartItem[];
};
