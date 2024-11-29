// const express = require("express");
import { StatusCodes } from "http-status-codes";
import { ResponseMessage } from "../utils/ResponseMessage.js";

import User from "../models/userSchema.js";
const addEditUser = async (req, res) => {
  console.log("Req.bodyyyy++++====", req.body);
  const { _id } = req.body;
  try {
    const {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      fathersName,
      gender,
      maritalStatus,
      aadhaar,
      pan,
      mobile,
      email,
      address,
      city,
      state,
      pincode,
      deduction80C,
      disabledDependent,
      disabilityNature,
      dependentType,
      panOfDependent,
      aadhaarOfDependent,
      form10IADetails,
      form10IAFilingDate,
      form10IAAckNo,
      udidNo,
      insuranceSelf,
      insuranceParents,
      donation,
      cashContribution,
      nonCashContribution,
      contributionDate,
      transactionRefNo,
      ifscCode,
      salaryIncome,
      gainsFromStocks, interestIncome,
      housePropertyIncome,
      dividendIncome,
      professionalIncome,
      cryptoIncome,
      exemptIncome
    } = req.body;

    // If _id is provided, update the user
    if (_id) {
      const updateFields = {
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        fathersName,
        gender,
        maritalStatus,
        aadhaar,
        pan,
        mobile,
        email,
        address,
        city,
        state,
        pincode,
        deduction80C,
        disabledDependent,
        disabilityNature,
        dependentType,
        panOfDependent,
        aadhaarOfDependent,
        form10IADetails,
        form10IAFilingDate,
        form10IAAckNo,
        udidNo,
        insuranceSelf,
        insuranceParents,
        donation,
        cashContribution,
        nonCashContribution,
        contributionDate,
        transactionRefNo,
        ifscCode,
        salaryIncome,
        gainsFromStocks, interestIncome,
        housePropertyIncome,
        dividendIncome,
        professionalIncome,
        cryptoIncome,
        exemptIncome
      };

      const updatedUser = await User.findByIdAndUpdate(_id, updateFields, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({
          message: ResponseMessage.USER_NOT_FOUND,
          data: [],
          status: StatusCodes.NOT_FOUND,
        });
      }

      return res.status(200).json({
        message: ResponseMessage.USER_UPDATED,
        data: { user: updatedUser },
        status: StatusCodes.OK,
      });
    }

    // If no _id is provided, create a new user
    const findEmail = await User.findOne({ email, isDeleted: false });

    if (findEmail) {
      return res.status(400).json({
        message: ResponseMessage.USER_ALREADY_EXIST,
        data: [],
        status: StatusCodes.BAD_REQUEST,
      });
    }

    const user = await User.create({
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      fathersName,
      gender,
      maritalStatus,
      aadhaar,
      pan,
      mobile,
      email,
      address,
      city,
      state,
      pincode,
      deduction80C,
      disabledDependent,
      disabilityNature,
      dependentType,
      panOfDependent,
      aadhaarOfDependent,
      form10IADetails,
      form10IAFilingDate,
      form10IAAckNo,
      udidNo,
      insuranceSelf,
      insuranceParents,
      donation,
      cashContribution,
      nonCashContribution,
      contributionDate,
      transactionRefNo,
      ifscCode,
      salaryIncome,
      gainsFromStocks, interestIncome,
      housePropertyIncome,
      dividendIncome,
      professionalIncome,
      cryptoIncome,
      exemptIncome
    });

    await user.save();

    return res.status(200).json({
      status: StatusCodes.OK,
      message: ResponseMessage.USER_CREATED,
      data: user,
    });
  } catch (error) {
    console.log("Upsert Error: ", error);
    return res.status(500).json({
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: [],
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ isDeleted: false }).sort({
      createdAt: -1,
    });

    if (!allUsers || (await allUsers).length == 0) {
      return res.status(400).json({
        message: ResponseMessage.DATA_NOT_FOUND,
        data: [],
        status: StatusCodes.BAD_REQUEST,
      });
    }
    return res.status(200).json({
      message: ResponseMessage.DATA_FOUND,
      data: allUsers,
      status: StatusCodes.OK,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: [],
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

const getSingleUserById = async (req, res) => {
  console.log("Rerwerwerwerwerewrw",req.body);
  
  const { _id } = req.user || req?.body;
  // const { _id } = req.body;
  try {
    // const { _id } = req.user;

    if (!_id) {
      return res.status(400).json({
        message: ResponseMessage.BAD_REQUEST,
        data: [],
        status: StatusCodes.BAD_REQUEST,
      });
    }

    const findUser = await User.findById({ _id, isDeleted: false });
    if (!findUser) {
      return res.status(400).json({
        message: ResponseMessage.DATA_NOT_FOUND,
        data: [],
        status: StatusCodes.BAD_REQUEST,
      });
    }

    return res.status(200).json({
      data: findUser,
      message: ResponseMessage.DATA_FOUND,
      status: StatusCodes.OK,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: [],
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const _id = req.query.id;
    if (!_id) {
      return res.status(400).json({
        message: ResponseMessage.BAD_REQUEST,
        data: [],
        status: StatusCodes.BAD_REQUEST,
      });
    }
    const findAccount = await User.findByIdAndUpdate(
      _id,
      { isDeleted: true },
      { new: true }
    );
    if (findAccount) {
      return res.status(200).json({
        message: ResponseMessage.USER_DELETED,
        status: StatusCodes.OK,
        data: [],
      });
    } else {
      return res.status(400).json({
        message: ResponseMessage.BAD_REQUEST,
        status: StatusCodes.BAD_REQUEST,
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: [],
      message: ResponseMessage.INTERNAL_SERVER_ERROR,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
};

export {
  addEditUser,
  getAllUsers,
  getSingleUserById,
  deleteAccount
}