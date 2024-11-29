const express = require("express")
const  {
  addEditIncome,
  getAllIncome,
  deleteIncome
} = require('../controller/incomeController');

const incomeRoutes = express.Router();

incomeRoutes.get("/get-all-income", getAllIncome);
incomeRoutes.post("/add-edit-income", addEditIncome);
incomeRoutes.get("/delete-income", deleteIncome);

module.exports= incomeRoutes