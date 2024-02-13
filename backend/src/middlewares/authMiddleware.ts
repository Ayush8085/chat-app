import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import prisma from "../prisma.js";

const authMiddleware: RequestHandler = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    res.status(403);
    throw new Error("Authorization token missing!!");
  }

  const decoded = (await jwt.verify(token, JWT_SECRET)) as JwtPayload;
  if (!decoded) {
    res.status(403);
    throw new Error("Invalid authorization token!!");
  }
  

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
    select: {
      id: true,
      fullName: true,
      username: true,
      gender: true,
      avatar: true,
      createdAt: true,
    },
  });
  
  if (!user) {
    res.status(404);
    throw new Error("User not found!!");
  }

  req.user = user;

  next();
});

export default authMiddleware;
