import { ZodError, z } from "zod";
import type { ZodType } from "zod";
import { LoginValidation } from "./constants";

/** The validateEmailObject function is just a test function
 * if you want to validate an object with zod, use the validateObject function instead
 */

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

function validateObject<T = object>(
  payload: T,
  shape: ZodType<typeof payload>
): z.infer<typeof shape> | ZodError {
  try {
    const validObj = shape.parse(payload);
    return validObj;
  } catch (err) {
    if (err instanceof ZodError) {
      return err;
    }
    return new ZodError<typeof shape>([]);
  }
}

export { EventCreatorSignUpShape } from "./constants";

export { validateEmailObject, validateObject };
