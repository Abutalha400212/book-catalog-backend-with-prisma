import express from "express";
import { UserController } from "./user.controller";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
import { UserValidation } from "./user.validations";
import validateRequest from "../../../middleware/validateRequest";

const router = express.Router();

router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);
router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.getByIdFromDB);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.update),
  UserController.updateOneInDB
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteByIdFromDB
);

export const UserRoutes = router;
