import { z } from "zod";

const createUser = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    name: z.string({
      required_error: "Name is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    role: z.enum(["ADMIN", "CUSTOMER"] as [string, ...string[]]),
    contactNo: z.string({
      required_error: "ContactNo is required",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
    profileImg: z.string({
      required_error: "ProfileImg is required",
    }),
  }),
});

const loginUser = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export const AuthValidation = {
  createUser,
  loginUser,
};
