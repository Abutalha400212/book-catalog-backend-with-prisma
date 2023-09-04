import { Order, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { JwtPayload } from "jsonwebtoken";

const insertToDB = async (data: Order): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      userId: data?.userId,
      orderedBooks: data.orderedBooks as Prisma.JsonArray,
    },
  });
  return result;
};
const getAllFromDB = async (user: JwtPayload | null): Promise<Order[]> => {
  let result: Order[] = [];
  if (user?.role === "CUSTOMER") {
    result = await prisma.order.findMany({
      where: {
        userId: user?.userId,
      },
    });
  } else if (user?.role === "ADMIN") {
    result = await prisma.order.findMany({});
  }

  return result;
};

const getByIdFromDB = async (
  id: string,
  user: JwtPayload | null
): Promise<Order | null> => {
  let result = null;
  if (user?.role === "CUSTOMER") {
    result = await prisma.order.findUnique({
      where: {
        id,
        userId: user?.userId,
      },
    });
  } else if (user?.role === "ADMIN") {
    result = await prisma.order.findUnique({
      where: {
        id,
      },
    });
  }
  return result;
};

export const OrderService = {
  insertToDB,
  getByIdFromDB,
  getAllFromDB,
};
