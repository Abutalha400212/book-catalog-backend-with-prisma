import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { jwtHelpers } from "../helpers/JWT.token";
import config from "../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../errors/apiError";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(
        token as string,
        config.jwt.secret as Secret
      );

      req.user = verifiedUser;
      // Authorization
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
