import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
import userRoute from "./routes/userRoutes.js";
import { FRONTEND_URL, PORT } from "./config.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import cors from "cors";
import { app, server } from "./socket/socket.js";
// ------------- MIDDLEWARES -------------
app.use(cors({
    origin: [FRONTEND_URL],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
// ------------- ROUTES MIDDLEWARES -------------
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/messages", authMiddleware, messageRoute);
app.use("/api/v1/users", authMiddleware, userRoute);
// ------------- ERROR MIDDLEWARE -------------
app.use(errorMiddleware);
// ------------- LISTENING TO SERVER -------------
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
