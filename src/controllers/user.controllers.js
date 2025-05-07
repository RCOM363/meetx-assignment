import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;
  const existingUser = await User.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  // check for existing user
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with same email or phone number already exists" });
  }

  //   hash passsword
  const hashedPassword = await bcrypt.hash(password, 10);

  //   create new user
  const user = await User.create({
    name,
    email,
    phoneNumber,
    password: hashedPassword,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    return res
      .status(500)
      .json({ message: "Something went wrong while registering user" });
  }

  return res
    .status(201)
    .json({ message: "User registered successfully", createdUser });
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  res
    .status(200)
    .cookie("token", token, options)
    .json({ message: "User logged in successfully" });
});

export { registerUser, loginUser };
