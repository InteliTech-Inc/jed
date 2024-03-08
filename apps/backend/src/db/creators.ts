import type { EventCreatorSignup } from "@repo/types";
import EventCreator from "../models/creator";

const getCreatorByEmail = async (email: string) =>
  EventCreator.findOne({ email });

const CreateEventCreator = (payload: EventCreatorSignup) =>
  new EventCreator(payload).save();

export { CreateEventCreator, getCreatorByEmail };
