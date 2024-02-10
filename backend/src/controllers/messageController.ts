import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import z from "zod";
import prisma from "../prisma.js";

// -------------- SEND MESSAGE ---------------
const sendMessage: RequestHandler = asyncHandler(async (req, res) => {
  const recieverId = req.params.id;
  const senderId = req.user.id;
  const { message } = req.body;
  if (!message) {
    res.status(404);
    throw new Error("Message cannot be empty!!");
  }

  // Create message
  const newMessage = await prisma.message.create({
    data: {
      message,
      sender: {
        connect: {
          id: senderId,
        },
      },
      reciever: {
        connect: {
          id: recieverId,
        },
      },
    },
  });

  res.status(201).json({
    newMessage,
  });
});

export { sendMessage };
