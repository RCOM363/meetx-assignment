import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    activitiesBooked: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Activity",
        },
      ],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
