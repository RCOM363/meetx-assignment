import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    time: {
      type: Date,
      required: [true, "Time is required"],
    },
  },
  { timestamps: true }
);

export const Activity = mongoose.model("Activity", activitySchema);
