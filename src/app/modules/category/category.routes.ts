import express from "express";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
import validateRequest from "../../../middleware/validateRequest";
import { CategoryController } from "./category.controller";
import { CategoryValidation } from "./category.validation";

const router = express.Router();

router.get("/", auth(ENUM_USER_ROLE.ADMIN), CategoryController.getAllFromDB);
router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.getByIdFromDB
);
router.post(
  "/create-category",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.create),
  CategoryController.insertToDB
);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.update),
  CategoryController.updateOneInDB
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteByIdFromDB
);

export const CategoryRoutes = router;
