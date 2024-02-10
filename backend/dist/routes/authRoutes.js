import { Router } from "express";
import { loginUser, logoutUser, signupUser, } from "../controllers/authControllers.js";
const router = Router();
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
export default router;
