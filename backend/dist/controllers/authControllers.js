var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import asyncHandler from "express-async-handler";
import z from 'zod';
import prisma from "../prisma.js";
import bcrypt from 'bcryptjs';
import generateToken from "../utils/generateToken.js";
// -------------- SIGNUP ---------------
const signupUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signupValidation = z.object({
        fullName: z.string(),
        username: z.string(),
        gender: z.string(),
        password: z.string().min(6),
        password2: z.string().min(6),
    });
    // Input validation
    const { success } = signupValidation.safeParse(req.body);
    if (!success) {
        res.status(404);
        throw new Error('Invalid/Missing inputs!!');
    }
    const { fullName, username, gender, password, password2 } = req.body;
    // Check if passowrd matches
    if (password !== password2) {
        res.status(404);
        throw new Error("Passwords do not match!!");
    }
    // Check if username already taken
    const userExists = yield prisma.user.findFirst({
        where: {
            username,
        }
    });
    if (userExists) {
        res.status(404);
        throw new Error("Username already taken!!");
    }
    // Create the user
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    // Hash password
    const hashPassword = yield bcrypt.hash(password, 10);
    const user = yield prisma.user.create({
        data: {
            fullName,
            username,
            gender,
            password: hashPassword,
            avatar: gender === 'male' ? boyProfilePic : girlProfilePic,
        }
    });
    // Generate token
    const token = generateToken(user.id);
    res.status(201)
        .cookie('token', token, {
        secure: false,
        httpOnly: true
    })
        .json({
        message: "Signup successfully!!",
        user,
        token,
    });
}));
// -------------- LOGIN ---------------
const loginUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
// -------------- LOGOUT ---------------
const logoutUser = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
export { signupUser, loginUser, logoutUser };
