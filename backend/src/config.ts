import "dotenv/config";
import { Secret } from "jsonwebtoken";

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET as Secret;
const NODE_ENV = process.env.NODE_ENV;
const FRONTEND_URL = process.env.FRONTEND_URL || '';

export { PORT, JWT_SECRET, NODE_ENV, FRONTEND_URL };
