const express = require("express")
const  {
  addEditTax,
  deleteTax,
  getAllTax,
} = require('../controller/taxController');

const taxRoutes = express.Router();

taxRoutes.get("/get-all-tax", getAllTax);
taxRoutes.post("/add-edit-tax", addEditTax);
taxRoutes.get("/delete-tax", deleteTax);

module.exports=taxRoutes;
