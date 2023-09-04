import express from "express";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
import { OrderController } from "./order.controller";
import { OrderValidation } from "./order.validation";
import validateRequest from "../../../middleware/validateRequest";

const router = express.Router();
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getAllFromDB
);

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getByIdFromDB
);

router.post(
  "/create-order",
  auth(ENUM_USER_ROLE.CUSTOMER),
  validateRequest(OrderValidation.create),
  OrderController.insertToDB
);

export const OrderRoutes = router;
