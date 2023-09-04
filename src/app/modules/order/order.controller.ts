import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Order, User } from "@prisma/client";
import { OrderService } from "./order.service";
import { JwtPayload } from "jsonwebtoken";

const insertToDB = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload | null = req?.user;
  req.body.userId = user?.userId;
  const result = await OrderService.insertToDB(req.body);
  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Created successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload | null = req?.user;
  const result = await OrderService.getAllFromDB(user);
  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders fetched successfully",
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user: JwtPayload | null = req?.user;
  const result = await OrderService.getByIdFromDB(id, user);
  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

export const OrderController = {
  insertToDB,
  getAllFromDB,
  getByIdFromDB,
};
