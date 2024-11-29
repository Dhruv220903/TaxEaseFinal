import express from 'express';
import {
  addEditUser,
  deleteAccount,
  getAllUsers,
  getSingleUserById,
} from '../controller/userController.js';
import { verifyToken } from '../middleware/authJwt.js';

const userRoutes = express.Router();

userRoutes.get('/detail', verifyToken, getSingleUserById);
userRoutes.get('/get-all-users', getAllUsers);
userRoutes.post('/get-single-user', getSingleUserById);
userRoutes.post('/add-edit-profile', verifyToken, addEditUser);
userRoutes.get('/delete-user', deleteAccount);

export default userRoutes;
