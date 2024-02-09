import { Router } from "express";
import { signupUser } from "../controllers/authControllers.js";
const router = Router();
router.get("/signup", signupUser);
router.post("/login");
router.post("/logout");
export default router;
