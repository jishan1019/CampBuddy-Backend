import { Types } from "mongoose";

export type TReview = {
  user: Types.ObjectId;
  order: Types.ObjectId;
  rating: number;
  comment: string;
};
