import { Router } from "express";
import { getUsersExpectMe } from "../controllers/userControllers.js";

const router = Router();

router.get("/", getUsersExpectMe);

export default router;
