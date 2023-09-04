import { Book, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import {
  IGenereicResponse,
  IPaginationOptions,
} from "../../../interfaces/common";
import { PaginationHelper } from "../../../helpers/paginationHelpers";
import { booksSearchableFields } from "./book.constant";
import { IBookFilterRequest } from "./book.interface";

const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};

const getAllFromDB = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenereicResponse<Book[]>> => {
  const { size, page, skip } = PaginationHelper.createPagination(options);
  const { search, minPrice, maxPrice, ...filterData } = filters;
  console.log(minPrice);

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: booksSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte: parseFloat(minPrice),
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: parseFloat(maxPrice),
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};
const getByCategoryIdFromDB = async (categoryId: string): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Book> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

export const BookService = {
  insertIntoDB,
  getAllFromDB,
  getByCategoryIdFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
