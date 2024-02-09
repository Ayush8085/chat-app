import "dotenv/config";
import { Secret } from "jsonwebtoken";

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET as Secret;

export { PORT, JWT_SECRET };
