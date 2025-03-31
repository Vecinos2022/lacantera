import mongoose, { Schema } from "mongoose";

export interface ISchedule {
  title: string;
  content: string;
  srcImage: string;
}

const ScheduleSchema = new Schema<ISchedule>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  srcImage: { type: String, required: true },
});

export const ScheduleModel =
  mongoose.models.Schedule ||
  mongoose.model<ISchedule>("Schedule", ScheduleSchema);
