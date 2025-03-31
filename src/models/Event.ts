import mongoose, { Schema, Document } from "mongoose";

import { ISchedule, ScheduleModel } from "./Schedule";

export interface IEvent extends Document {
  eventId: string;
  name: string;
  date: string;
  location: string;
  mapUrl: string;
  schedule: ISchedule[];
}

const EventSchema = new Schema<IEvent>({
  eventId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  mapUrl: { type: String, required: true },
  schedule: { type: [ScheduleModel.schema], required: true },
});

export const EventModel =
  mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
