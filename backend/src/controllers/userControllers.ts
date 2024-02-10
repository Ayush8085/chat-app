import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../prisma.js";

// -------------- SEND MESSAGE ---------------
const getUsersExpectMe: RequestHandler = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        notIn: [req.user.id],
      },
    },
  });

  res.status(200).json(users);
});

export { getUsersExpectMe };
