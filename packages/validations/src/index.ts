import { ZodError, z } from "zod";
import { LoginValidation } from "./constants";

function validateEmailObject<T = object>(
  payload: T
): z.infer<typeof LoginValidation> | ZodError {
  try {
    const validObj = LoginValidation.parse(payload);
    return validObj;
  } catch (err) {
    if (err instanceof ZodError) {
      return err;
    }
    return new ZodError<typeof LoginValidation>([]);
  }
}

export { validateEmailObject };
