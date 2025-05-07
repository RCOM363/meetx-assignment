import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

export const verifyJWT = expressAsyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(400).json({ message: "Unauthorized access" });
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decodedToken.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Invalid access token" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error?.message });
  }
});
