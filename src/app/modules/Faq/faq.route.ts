import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import {
  faqValidationSchema,
  updateFaqValidationSchema,
} from "./faq.validation";
import { FaqController } from "./faq.controller";

const router = Router();

router.get("/all-faq", FaqController.getAllFaq);

router.post(
  "/create-faq/:_id",
  auth(USER_ROLE.admin),
  validateRequest(faqValidationSchema),
  FaqController.createFaq
);

router.patch(
  "/update-faq/:_id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(updateFaqValidationSchema),
  FaqController.updateFaq
);

router.delete(
  "/delete-faq/:_id",
  auth(USER_ROLE.admin),
  FaqController.deleteFaq
);

export const FaqRoutes = router;
