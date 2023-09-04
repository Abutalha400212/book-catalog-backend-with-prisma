import { z } from "zod";

const create = z.object({
  body: z.object({
    userId: z.string().optional(),
    status: z.string().optional(),
    orderedBooks: z
      .array(
        z.object({
          orderId: z.string().optional(),
          quantity: z.number().optional(),
        })
      )
      .optional(),
  }),
});

export const OrderValidation = {
  create,
};
