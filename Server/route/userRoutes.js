const express = require("express")
const {
  addEditUser,
  deleteAccount,
  getAllUsers,
  getSingleUserById,
} =  require("../controller/userController.js");
const { verifyToken } = require("../middleware/authJwt.js");


const userRoutes = express.Router();

userRoutes.get("/detail",verifyToken,getSingleUserById)
userRoutes.get("/get-all-users", getAllUsers);
userRoutes.post("/get-single-user", getSingleUserById);
userRoutes.post("/add-edit-profile",verifyToken, addEditUser);
userRoutes.get("/delete-user", deleteAccount);

module.exports =userRoutes;
