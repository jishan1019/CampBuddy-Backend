import { Types } from "mongoose";

export type TWishList = {
  user: Types.ObjectId;
  item: Types.ObjectId;
};
