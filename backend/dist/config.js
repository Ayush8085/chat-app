import "dotenv/config";
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
export { PORT, JWT_SECRET };
