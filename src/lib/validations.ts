import * as z from "zod";

const passwordShape = z
  .string()
  .min(8, {
    message: "Password must be at least 8 characters long",
  })
  .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
    message: "Password requires: uppercase, lowercase, number.",
  });

// Check passwords
export const shape = z
  .object({
    password: passwordShape,
    confirm_password: passwordShape,
  })
  .superRefine(({ confirm_password, ...rest }, ctx) => {
    if (confirm_password !== rest.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }
    return true;
  });

const emailShape = z.string().email({
  message: "Please enter a valid email address",
});

export const authShape = z.object({
  email: emailShape,
  password: passwordShape,
});

export const forgotPasswordShape = z.object({
  email: emailShape,
});

// Use Shape to validate Reset Password
export const resetPasswordShape = shape;

export const signupShape = z
  .object({
    firstName: z.string().min(2, {
      message: "First name is required!",
    }),
    lastName: z.string().min(2, {
      message: "Last name is required!",
    }),
    email: emailShape,
    phone: z.string().min(10, {
      message: "Phone number is required!",
    }),
    password: passwordShape,
    confirm_password: passwordShape,
  })
  .superRefine(({ confirm_password, ...rest }, ctx) => {
    if (confirm_password !== rest.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }
    return true;
  });
