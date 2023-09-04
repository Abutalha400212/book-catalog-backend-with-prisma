import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import hashPassword from "../../../helpers/hashPassword";
import { IAuth, IAuthResponse } from "./auth.interface";
import { jwtHelpers } from "../../../helpers/JWT.token";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const createUser = async (data: User): Promise<User> => {
  data.password = await hashPassword(data.password);
  const result = await prisma.user.create({
    data,
  });

  return result;
};
const loginUser = async (payload: IAuth): Promise<IAuthResponse> => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not Found");
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password is inCorrect");
  }

  const { role, id } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId: id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthService = {
  createUser,
  loginUser,
};
