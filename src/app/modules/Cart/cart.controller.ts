import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CartService } from "./cart.service";

const getMyCart = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await CartService.getMyCartFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart is retrieved successfully",
    data: result,
  });
});

const addToCart = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const data = req.body;

  const result = await CartService.addToCartFromDB(userId, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Item add to cart successfully",
    data: result,
  });
});

export const CartController = {
  getMyCart,
  addToCart,
};
