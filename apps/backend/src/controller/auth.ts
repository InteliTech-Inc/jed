import { MongooseError } from "mongoose";
import { genSalt, hash } from "bcryptjs";
import { validateObject, EventCreatorSignUpShape } from "@repo/validations";
import type { EventCreatorSignup } from "@repo/types";
import type { Request, Response } from "express";
import { ZodError } from "zod";
import { log } from "@repo/logger";
import { CreateEventCreator, getCreatorByEmail } from "../db/creators";
import { ErrorMessage, STATUS } from "../utils";

async function handleCreateAccount(
  req: Request<unknown, unknown, EventCreatorSignup>,
  res: Response
) {
  const formObj = validateObject(req.body, EventCreatorSignUpShape);

  if (formObj instanceof ZodError) {
    const { message } = formObj.issues[0];
    return res.status(STATUS.BAD_REQUEST.code).json(ErrorMessage(400, message));
  }
  const { email, firstName, lastName, password } = formObj;

  try {
    const userExists = await getCreatorByEmail(email);

    if (userExists) {
      return res
        .status(400)
        .json(ErrorMessage(400, "User with this email already exists"));
    }

    const SALT_FACTOR = await genSalt(10);

    const hashedPassword = await hash(password, SALT_FACTOR);

    const _ = CreateEventCreator({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(200).json(ErrorMessage(200, "Account created successfully"));
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json(ErrorMessage(500));
    }
    log(error);
    res.status(500).json(ErrorMessage(500, "Error creating an account"));
  }
}

export { handleCreateAccount };
