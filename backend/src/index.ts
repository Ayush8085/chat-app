import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
import { PORT } from "./config.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const app = express();

// ------------- MIDDLEWARES -------------
app.use(express.json());
app.use(cookieParser());

// ------------- ROUTES MIDDLEWARES -------------
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/messages", authMiddleware, messageRoute);

// ------------- ERROR MIDDLEWARE -------------
app.use(errorMiddleware);

// ------------- LISTENING TO SERVER -------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
