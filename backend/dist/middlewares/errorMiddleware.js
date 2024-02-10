var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NODE_ENV } from "../config.js";
const errorMiddleware = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const statusCode = req.statusCode ? req.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: NODE_ENV === "development" ? err.stack : null,
    });
});
export default errorMiddleware;
