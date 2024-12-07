import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import {
  productValidationSchema,
  updateProductValidationSchema,
} from "./product.validation";
import { ProductController } from "./product.controller";

const router = Router();

router.get("/all-product", ProductController.getAllProduct);

router.get("/single-product/:_id", ProductController.getSingleProduct);

router.post(
  "/create-product",
  auth(USER_ROLE.admin),
  validateRequest(productValidationSchema),
  ProductController.createProduct
);

router.patch(
  "/update-product/:_id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(updateProductValidationSchema),
  ProductController.updateProduct
);

router.delete(
  "/delete-product/:_id",
  auth(USER_ROLE.admin),
  ProductController.deleteProduct
);

export const ProductRoutes = router;
