import { JwtPayload } from "jsonwebtoken";
import { CartModel } from "./cart.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TCartItem } from "./cart.interface";
import { ProductModel } from "../Product/product.model";
import { CART_INC_TYPE } from "./cart.constant";

const getMyCartFromDB = async (userId: JwtPayload) => {
  const result = await CartModel.findOne({ user: userId }).populate({
    path: "items.product",
    select: "_id name price images stockQuantity",
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart item not found");
  }

  return result;
};

const addToCartFromDB = async (userId: JwtPayload, payload: TCartItem) => {
  const product = await ProductModel.findOne({ _id: payload.product });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  const cart = await CartModel.findOne({ user: userId });

  if (cart) {
    const itemAlreadyExistsOnCart = cart.items.find(
      (item) => item.product.toString() === payload.product.toString()
    );

    if (itemAlreadyExistsOnCart) {
      const result = await CartModel.findByIdAndUpdate(
        cart?._id,
        {
          $inc: { totalPrice: product.price, "items.$[item].quantity": 1 },
        },
        {
          new: true,
          arrayFilters: [{ "item.product": payload.product }],
        }
      );

      return result;
    } else {
      const newPayloadData = {
        product: product._id,
        quantity: 1,
      };

      const result = await CartModel.findByIdAndUpdate(
        cart?._id,
        {
          $inc: { totalPrice: product.price },
          $push: { items: newPayloadData },
        },
        {
          new: true,
        }
      );

      return result;
    }
  } else {
    const newPayloadData = {
      user: userId,
      totalPrice: product.price,
      items: {
        product: product._id,
        quantity: 1,
      },
    };

    const result = await CartModel.create(newPayloadData);
    return result;
  }
};

const updateCartQtyFromDB = async (
  userId: JwtPayload,
  payload: Partial<TCartItem>
) => {
  const cart = await CartModel.findOne({ user: userId });

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart item not found");
  }

  const product = await ProductModel.findOne({ _id: payload.product });

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  const result = await CartModel.findByIdAndUpdate(
    cart?._id,
    {
      $inc: {
        totalPrice:
          payload.cartIncType === CART_INC_TYPE.increment
            ? product.price
            : -product.price,

        "items.$[item].quantity":
          payload.cartIncType === CART_INC_TYPE.increment ? 1 : -1,
      },
    },
    {
      new: true,
      arrayFilters: [{ "item.product": payload.product }],
    }
  );

  return result;
};

const deleteCartItemFromDB = async (userId: JwtPayload, itemId: string) => {
  const cart = await CartModel.findOne({ user: userId });

  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart item not found");
  }

  const product = await ProductModel.findOne({ _id: itemId }).select("price");

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  const cartItem = cart.items.find(
    (item) => item.product.toString() === itemId
  );

  const result = await CartModel.updateOne(
    { user: userId },
    {
      $inc: { totalPrice: -product.price * (cartItem?.quantity || 1) },
      $pull: { items: { product: itemId } },
    },
    { new: true, arrayFilters: [{ "item.product": itemId }] }
  );

  return null;
};

export const CartService = {
  getMyCartFromDB,
  addToCartFromDB,
  updateCartQtyFromDB,
  deleteCartItemFromDB,
};
