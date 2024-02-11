import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
import userRoute from "./routes/userRoutes.js";
import { PORT } from "./config.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import cors from 'cors';
const app = express();
// ------------- MIDDLEWARES -------------
app.use(cors({
    origin: ['http://localhost:5173'],
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
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
