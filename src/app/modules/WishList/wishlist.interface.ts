import { Types } from "mongoose";

export type TWishList = {
  user: Types.ObjectId;
  items: Types.ObjectId[];
};
