import { Router } from "express";
import {
  getActivities,
  bookActivity,
  getBookings,
} from "../controllers/activity.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-activities").get(getActivities);
router.route("/book-activity/:activityId").post(verifyJWT, bookActivity);
router.route("/get-bookings").get(verifyJWT, getBookings);

export { router as activityRouter };
