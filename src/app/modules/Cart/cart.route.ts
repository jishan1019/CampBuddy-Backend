import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { CartController } from "./cart.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  cartValidationSchema,
  updateCartValidationSchema,
} from "./cart.validation";

const router = Router();

router.get("/my-cart", auth(USER_ROLE.user), CartController.getMyCart);

router.post(
  "/add-to-cart",
  auth(USER_ROLE.user),
  validateRequest(cartValidationSchema),
  CartController.addToCart
);

router.patch(
  "/update-cart-quantity",
  auth(USER_ROLE.user),
  validateRequest(updateCartValidationSchema),
  CartController.updateCartQty
);

router.delete(
  "/delete-cart-item/:_id",
  auth(USER_ROLE.user),
  CartController.deleteCartItem
);

export const CartRoutes = router;
