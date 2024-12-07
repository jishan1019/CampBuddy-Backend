import { Types } from "mongoose";

export type TWishList = {
  user: Types.ObjectId;
  product: Types.ObjectId;
};
