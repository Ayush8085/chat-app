import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const generateToken = (id: String) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' })
}

export default generateToken;