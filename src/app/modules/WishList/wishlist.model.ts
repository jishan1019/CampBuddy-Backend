import { model, Schema } from "mongoose";
import { TWishList } from "./wishlist.interface";

const wishListSchema = new Schema<TWishList>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const WishListModel = model<TWishList>("WishList", wishListSchema);
