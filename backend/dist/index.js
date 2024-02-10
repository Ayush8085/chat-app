import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes.js";
import { PORT } from "./config.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
const app = express();
// ------------- MIDDLEWARES -------------
app.use(express.json());
app.use(cookieParser());
// ------------- ROUTES MIDDLEWARES -------------
app.use("/api/v1/auth", authRoute);
// ------------- ERROR MIDDLEWARE -------------
app.use(errorMiddleware);
// ------------- LISTENING TO SERVER -------------
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
