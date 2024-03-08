import { z } from "zod";

const LoginValidation = z.object({
  email: z
    .string({ required_error: "Email must be provided" })
    .email({ message: "Email should be valid" }),
  password: z
    .string({ required_error: "Password must be provided" })
    .min(8, "Password should be at least 8 characters long"),
});

const EventCreatorSignUpShape = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, "First name should be valid"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, "Last name should be valid"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Email should be valid"),
  password: z
    .string({ required_error: "Password is required" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$&*])(?=.*[^\w\s])(?=.{8,32}$)/,
      "Password should be at least 8 characters long and should contain an uppercase, lowercase, a number and a symbol"
    ),
});

export { LoginValidation, EventCreatorSignUpShape };
