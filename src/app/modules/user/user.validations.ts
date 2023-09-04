import { z } from "zod";

const update = z.object({
  body: z.object({
    email: z.string().optional(),
    name: z.string().optional(),
    password: z.string().optional(),
    role: z.enum(["ADMIN", "CUSTOMER"] as [string, ...string[]]).optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  update,
};
