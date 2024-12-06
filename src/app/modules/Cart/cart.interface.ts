import { Types } from "mongoose";

export type TCartItem = {
  product: Types.ObjectId;
  quantity: number;
};

export type TCart = {
  user: Types.ObjectId;
  items: TCartItem[];
  totalPrice: number;
};
