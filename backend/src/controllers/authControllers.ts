import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import z from "zod";
import prisma from "../prisma.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// -------------- SIGNUP ---------------
const signupUser: RequestHandler = asyncHandler(async (req, res) => {
  const signupValidation = z.object({
    fullName: z.string(),
    username: z.string(),
    gender: z.string(),
    password: z.string().min(6),
    password2: z.string().min(6),
  });

  // Input validation
  const { success } = signupValidation.safeParse(req.body);
  if (!success) {
    res.status(404);
    throw new Error("Invalid/Missing inputs!!");
  }

  const { fullName, username, gender, password, password2 } = req.body;

  // Check if passowrd matches
  if (password !== password2) {
    res.status(404);
    throw new Error("Passwords do not match!!");
  }

  // Check if username already taken
  const userExists = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (userExists) {
    res.status(404);
    throw new Error("Username already taken!!");
  }

  // Create the user
  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  // Hash password
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      fullName,
      username,
      gender,
      password: hashPassword,
      avatar: gender === "male" ? boyProfilePic : girlProfilePic,
    },
  });

  // Generate token
  const token = generateToken(user.id);

  res
    .status(201)
    .cookie("token", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      // secure: false,
      httpOnly: true,
      sameSite: "strict",
    })
    .json({
      message: "Signup successfully!!",
      user,
      token,
    });
});

// -------------- LOGIN ---------------
const loginUser: RequestHandler = asyncHandler(async (req, res) => {
  const loginValidation = z.object({
    username: z.string(),
    password: z.string().min(6),
  });

  // Input validation
  const { success } = loginValidation.safeParse(req.body);
  if (!success) {
    res.status(404);
    throw new Error("Invalid/Missing inputs!!");
  }

  const { username, password } = req.body;

  // Check existence
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (!user) {
    res.status(403);
    throw new Error("User not found!!");
  }

  // Check password
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    res.status(403);
    throw new Error("Invalid password!!");
  }

  // Generate token
  const token = generateToken(user.id);

  res
    .status(201)
    .cookie("token", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      // secure: false,
      httpOnly: true,
      sameSite: "strict",
    })
    .json({
      message: "Login successfully!!",
      user,
      token,
    });
});

// -------------- LOGOUT ---------------
const logoutUser: RequestHandler = asyncHandler(async (req, res) => {
  res.status(200).cookie("token", "", { maxAge: 0 }).json({
    message: "Logout successfully!!",
  });
});

export { signupUser, loginUser, logoutUser };
