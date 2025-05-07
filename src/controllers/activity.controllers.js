import expressAsyncHandler from "express-async-handler";

import { User } from "../models/user.model.js";
import { Activity } from "../models/activity.model.js";

const getActivities = expressAsyncHandler(async (_, res) => {
  const activities = await Activity.find();
  res.status(200).json(activities);
});

const bookActivity = expressAsyncHandler(async (req, res) => {
  const { activityId } = req.params;
  const user = await User.findById(req.user.id);

  if (!user.activitiesBooked.includes(activityId)) {
    user.activitiesBooked.push(activityId);
    await user.save();
  }

  res.status(200).json({ message: "Activity booked successfully" });
});

const getBookings = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("activitiesBooked");
  res.status(200).json(user.activitiesBooked);
});

export { getActivities, bookActivity, getBookings };
