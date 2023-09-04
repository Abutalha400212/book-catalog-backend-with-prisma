import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../../shared/catchAsync";
import prisma from "../../../shared/prisma";
import { User } from "@prisma/client";
import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import express from "express";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
const router = express.Router();
const getProfileService = async (
  user: JwtPayload | null
): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: user?.userId,
    },
  });

  return result;
};
const getProfileController = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload | null = req?.user;
  const result = await getProfileService(user);
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${user?.role} Profile retrived successfully`,
    data: result,
  });
});

router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  getProfileController
);

export const ProfileRoutes = router;
