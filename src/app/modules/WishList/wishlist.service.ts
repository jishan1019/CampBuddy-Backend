import { JwtPayload } from "jsonwebtoken";
import { TWishList } from "./wishlist.interface";
import { WishListModel } from "./wishlist.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const getMyWishlistFromDB = async (userId: JwtPayload) => {
  const result = await WishListModel.find({ user: userId }).populate("product");

  return result;
};

const addWishListItemFromDB = async (
  userId: JwtPayload,
  payload: TWishList
) => {
  const data = {
    user: userId,
    product: payload.product,
  };

  const existItem = await WishListModel.findOne({ product: payload?.product });

  if (existItem) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Item already exists on this list"
    );
  }

  const result = await WishListModel.create(data);

  return result;
};

const deleteWishListFromDB = async (itemId: string) => {
  const result = await WishListModel.deleteOne({
    _id: itemId,
  });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to remove product");
  }

  return null;
};

export const WishListService = {
  getMyWishlistFromDB,
  addWishListItemFromDB,
  deleteWishListFromDB,
};
