import { checkDuplicateUsernameOrEmail } from "../middleware/verifySignUp.js";
import express from "express";
import { signup, signin, signout } from "../controller/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post(
  "/signup",
  [
    checkDuplicateUsernameOrEmail
  ],
  signup
);

authRoutes.post("/signin", signin);

authRoutes.post("/signout", signout);

export default authRoutes;
