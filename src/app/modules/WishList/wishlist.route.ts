import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { WishListController } from "./wishlist.controller";
import validateRequest from "../../middlewares/validateRequest";
import { wishlistValidationSchema } from "./wishlist.validation";

const router = Router();

router.get(
  "/my-wishlist",
  auth(USER_ROLE.user),
  WishListController.getMyWishlist
);

router.post(
  "/add-wishlist-product",
  auth(USER_ROLE.user),
  validateRequest(wishlistValidationSchema),
  WishListController.addWishListItem
);

router.delete(
  "/delete-wishlist-product/:itemId",
  auth(USER_ROLE.user),
  WishListController.deleteWishList
);

export const WishListRoutes = router;
