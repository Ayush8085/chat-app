import asyncHandler from "express-async-handler";

// -------------- SIGNUP ---------------
const signupUser = asyncHandler(async (req, res) => {
  res.send("signup page");
});

// -------------- LOGIN ---------------
const loginUser = asyncHandler(async (req, res) => {});

// -------------- LOGOUT ---------------
const logoutUser = asyncHandler(async (req, res) => {});

export { signupUser, loginUser, logoutUser };
