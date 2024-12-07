import { JwtPayload } from "jsonwebtoken";
import { TWishList } from "./wishlist.interface";
import { WishListModel } from "./wishlist.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const getMyWishlistFromDB = async (userId: JwtPayload) => {
  const result = await WishListModel.find({ user: userId }).populate("item");

  return result;
};

const addWishListItemFromDB = async (
  userId: JwtPayload,
  payload: TWishList
) => {
  const data = {
    user: userId,
    item: payload.item,
  };

  const existItem = await WishListModel.findOne({ _id: payload?.item });

  if (existItem) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Item already exists on this list"
    );
  }

  const result = await WishListModel.create(data);

  return result;
};

const deleteWishListFromDB = async (userId: JwtPayload, itemId: string) => {
  const result = await WishListModel.deleteOne({
    user: userId,
    item: itemId,
  });

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to remove item");
  }

  return null;
};

export const WishListService = {
  getMyWishlistFromDB,
  addWishListItemFromDB,
  deleteWishListFromDB,
};
