import express from "express";
import {
  addEditIncome,
  getAllIncome,
  deleteIncome
} from "../controller/incomeController.js";

const incomeRoutes = express.Router();

incomeRoutes.get("/get-all-income", getAllIncome);
incomeRoutes.post("/add-edit-income", addEditIncome);
incomeRoutes.get("/delete-income", deleteIncome);

export default incomeRoutes;
