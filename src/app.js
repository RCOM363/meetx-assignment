import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// routes import
import { userRouter } from "./routes/user.routes.js";
import { activityRouter } from "./routes/activity.routes.js";

// router declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/activity", activityRouter);

export { app };
