import { Types } from "mongoose";

export type TCartItem = {
  product: Types.ObjectId;
  quantity: number;
};

export type TCart = {
  user: Types.ObjectId;
  totalPrice: number;
  items: TCartItem[];
};
