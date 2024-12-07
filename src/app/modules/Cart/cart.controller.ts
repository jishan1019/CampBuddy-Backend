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

const updateCartQty = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const data = req.body;

  const result = await CartService.updateCartQtyFromDB(userId, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart item remove successfully",
    data: result,
  });
});

const deleteCartItem = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { _id } = req.params;

  const result = await CartService.deleteCartItemFromDB(userId, _id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart item remove successfully",
    data: result,
  });
});

export const CartController = {
  getMyCart,
  addToCart,
  updateCartQty,
  deleteCartItem,
};
