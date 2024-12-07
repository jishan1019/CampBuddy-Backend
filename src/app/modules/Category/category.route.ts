import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryController } from "./category.controller";
import {
  categoryValidationSchema,
  updateCategoryValidationSchema,
} from "./category.validation";

const router = Router();

router.get("/all-category", CategoryController.getAllCategory);

router.get("/single-category/:_id", CategoryController.getSingleCategory);

router.post(
  "/create-category",
  auth(USER_ROLE.admin),
  validateRequest(categoryValidationSchema),
  CategoryController.createCategory
);

router.patch(
  "/update-category/:_id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(updateCategoryValidationSchema),
  CategoryController.updateCategory
);

router.delete(
  "/delete-category/:_id",
  auth(USER_ROLE.admin),
  CategoryController.deleteCategory
);

export const CategoryRoutes = router;
