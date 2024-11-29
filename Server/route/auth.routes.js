const { checkDuplicateUsernameOrEmail } = require("../middleware/verifySignUp");
const express = require("express")
const  {
  signup,
  signin,
  signout
} = require('../controller/auth.controller');

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
  module.exports= authRoutes