import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(AuthValidation.createUser),
  AuthController.createUser
);
router.post(
  "/login",
  validateRequest(AuthValidation.loginUser),
  AuthController.loginUser
);

export const AuthRoutes = router;
