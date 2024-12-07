import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { CartController } from "./cart.controller";

const router = Router();

router.get("/my-cart", auth(USER_ROLE.user), CartController.getMyCart);

router.post("/add-to-cart", auth(USER_ROLE.user), CartController.addToCart);

router.patch("/update-cart-quantity/:_id", auth(USER_ROLE.user));

router.delete(
  "/delete-cart-item/:_id",
  auth(USER_ROLE.user),
  CartController.deleteCartItem
);

export const CartRoutes = router;
