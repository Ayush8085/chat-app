import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import prisma from "../prisma.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

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

  const recieverSocketId = getRecieverSocketId(recieverId);
  if(recieverSocketId) {
    io.to(recieverSocketId).emit('newMessage', newMessage);
  }

  res.status(201).json({
    newMessage,
  });
});

// -------------- SEND MESSAGE ---------------
const getMessages: RequestHandler = asyncHandler(async (req, res) => {
  const recieverId = req.params.id;
  const senderId = req.user.id;

  // Get all messages
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId, recieverId },
        {
          senderId: recieverId,
          recieverId: senderId,
        },
      ],
    },
  });

  res.status(200).json({
    messages,
  });
});

export { sendMessage, getMessages };
