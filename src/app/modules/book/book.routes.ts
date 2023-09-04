import express from "express";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
import validateRequest from "../../../middleware/validateRequest";
import { BookController } from "./book.controller";
import { BookValidation } from "./book.validation";

const router = express.Router();

router.get("/", BookController.getAllFromDB);
router.get("/:categoryId/category", BookController.getByCategoryIdFromDB);
router.get("/:id", BookController.getByIdFromDB);
router.post(
  "/create-book",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.create),
  BookController.insertIntoDB
);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.update),
  BookController.updateOneInDB
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteByIdFromDB
);

export const BookRoutes = router;
