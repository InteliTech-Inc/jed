import { z } from "zod";

const LoginValidation = z.object({
  email: z
    .string({ required_error: "Email must be provided" })
    .email({ message: "Email should be valid" }),
  password: z
    .string({ required_error: "Password must be provided" })
    .min(8, "Password should be at least 8 characters long"),
});

export { LoginValidation };
