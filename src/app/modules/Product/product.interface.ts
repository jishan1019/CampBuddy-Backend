import { Types } from "mongoose";

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  images: string[];
  stockQuantity: number;
};
