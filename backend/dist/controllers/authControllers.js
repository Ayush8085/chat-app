var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import asyncHandler from "express-async-handler";
// -------------- SIGNUP ---------------
const signupUser = asyncHandler((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    res.send("signup page");
  }),
);
// -------------- LOGIN ---------------
const loginUser = asyncHandler((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {}),
);
// -------------- LOGOUT ---------------
const logoutUser = asyncHandler((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {}),
);
export { signupUser, loginUser, logoutUser };
