import { SortOrder } from "mongoose";

type IOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionsReturn = {
  page: number;
  size: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};
const createPagination = (options: IOptions): IOptionsReturn => {
  const page = Number(options.page) || 1;
  const size = Number(options.size) || 10;
  const skip = (page - 1) * size;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    size,
    skip,
    sortBy,
    sortOrder,
  };
};

export const PaginationHelper = {
  createPagination,
};
