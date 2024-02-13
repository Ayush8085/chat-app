import { Server } from "socket.io";
import http from "http";
import express from "express";
import { FRONTEND_URL } from "../config.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['https://chat-app-ayush8085.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

interface UserSocketMap {
  [userId: string]: string;
}

const userSocketMap: UserSocketMap = {}; // {'userId': 'socketId'}

export const getRecieverSocketId = (recieverId: string) => {
  return userSocketMap[recieverId];
};

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);
  console.log('SOCKET CONNECTED TO: ', FRONTEND_URL);
  

  const userId = socket.handshake.query.userId;
  if (typeof userId === "string" && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
    if (typeof userId === "string" && userId !== "undefined") {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
