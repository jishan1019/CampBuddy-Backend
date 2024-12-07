import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { WishListController } from "./wishlist.controller";

const router = Router();

router.get(
  "/my-wishlist",
  auth(USER_ROLE.user),
  WishListController.getMyWishlist
);

router.post(
  "/add-wishlist-item",
  auth(USER_ROLE.user),
  WishListController.addWishListItem
);

router.delete(
  "/delete-wishlist-item/:itemId",
  auth(USER_ROLE.user),
  WishListController.deleteWishList
);

export const WishListRoutes = router;
