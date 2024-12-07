import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { WishListService } from "./wishlist.service";

const getMyWishlist = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await WishListService.getMyWishlistFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "WishList is retrieved successfully",
    data: result,
  });
});

const addWishListItem = catchAsync(async (req, res) => {
  const data = req.body;
  const { userId } = req.user;

  const result = await WishListService.addWishListItemFromDB(userId, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "WishList item added successfully",
    data: result,
  });
});

const deleteWishList = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.user;

  const result = await WishListService.deleteWishListFromDB(userId, productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "item remove successfully",
    data: result,
  });
});

export const WishListController = {
  getMyWishlist,
  addWishListItem,
  deleteWishList,
};
