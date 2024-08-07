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
    phone: z
      .string()
      .min(10, {
        message: "Phone number is required!",
      })
      .regex(/^(?:\+\d{1,3})?\d{7,15}$/, {
        message: "Please enter a valid phone number",
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

export const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export const nominationShape = z.object({
  full_name: z.string({
    message: "Nominee's full name is required",
  }),
  email: z.string().optional(),
  telephone: z
    .string()
    .min(10, {
      message: "Phone number is required!",
    })
    .regex(/^(?:\+\d{1,3})?\d{7,15}$/, {
      message: "Please enter a valid phone number",
    }),
  reasons: z
    .string({
      message: "Reasons for nomination is required",
    })
    .optional(),
  category: z.string({
    message: "Category is required",
  }),
});

export const nomineeFormShape = z.object({
  full_name: z.string({
    message: "Nominee's full name is required",
  }),
  code: z.string({
    message: "Nominee's code is required",
  }),
  category: z.string({
    message: "Category is required",
  }),
});

export const payoutShape = z.object({
  channel: z.string().min(3, {
    message: "Payment channel is required",
  }),
  amount: z.string().min(1, {
    message: "Amount is required",
  }),
  provider: z.string().min(1),
  account_number: z.string().min(1),
  account_name: z.string().min(1),
});
