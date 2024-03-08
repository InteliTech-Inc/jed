import { Schema, model } from "mongoose";

const EventCreatorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const EventCreator = model("Event Creators", EventCreatorSchema);

export default EventCreator;
