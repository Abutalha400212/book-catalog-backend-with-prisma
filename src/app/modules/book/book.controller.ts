import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { booksFilterableFields, booksPaginationFields } from "./book.constant";
import { BookService } from "./book.service";
import { Book } from "@prisma/client";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, booksFilterableFields);
  const options = pick(req.query, booksPaginationFields);
  filters["categoryId"] = filters["category"];
  delete filters["category"];
  const result = await BookService.getAllFromDB(filters, options);
  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getByIdFromDB(id);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book fetched successfully",
    data: result,
  });
});
const getByCategoryIdFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    console.log(categoryId);
    const result = await BookService.getByCategoryIdFromDB(categoryId);
    sendResponse<Book[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Books with associated category data fetched successfully",
      data: result,
    });
  }
);

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.updateOneInDB(id, req.body);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.deleteByIdFromDB(id);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book delete successfully",
    data: result,
  });
});

export const BookController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
  getByCategoryIdFromDB,
};
