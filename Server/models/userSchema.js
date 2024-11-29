const mongoose = require("mongoose");;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    name: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    fathersName: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    maritalStatus: {
      type: String,
      enum: ["unmarried", "married"],
    },
    aadhaar: {
      type: String,
    },
    pan: {
      type: String,
    },
    mobile: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
    },
    deduction80C: { type: Number },
    disabledDependent: { type: Boolean },
    disabilityNature: { type: String },
    dependentType: { type: String },
    panOfDependent: { type: String },
    aadhaarOfDependent: { type: String },
    form10IADetails: { type: String },
    form10IAFilingDate: { type: Date },
    form10IAAckNo: { type: String },
    udidNo: { type: String },
    insuranceSelf: { type: Number },
    insuranceParents: { type: Number },
    donation: { type: Number },
    cashContribution: { type: Number },
    nonCashContribution: { type: Number },
    contributionDate: { type: Date },
    transactionRefNo: { type: String },
    ifscCode: { type: String },
    salaryIncome: {
      type: Number,
    },
    interestIncome: {
      type: Number,
      default: 0,
    },
    gainsFromStocks: {
      type: Number,
      default: 0,
    },
    housePropertyIncome: {
      type: Number,
      default: 0,
    },
    dividendIncome: {
      type: Number,
      default: 0,
    },
    professionalIncome: {
      type: Number,
      default: 0,
    },
    cryptoIncome: {
      type: Number,
      default: 0,
    },
    exemptIncome: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User