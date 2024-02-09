import { Router } from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/authControllers.js";

const router = Router();

router.get("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
