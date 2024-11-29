// src/components/TaxSummary.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const TaxSummary = () => {
    const location = useLocation();
    const personalInfoList = location.state || {};

    // const [personalInfoList, setPersonalInfoList] = useState({})
    console.log("personalInfoList", personalInfoList);
    console.log("personalInfoList", personalInfoList);
    let GrossIncome = personalInfoList?.professionalIncome + personalInfoList?.salaryIncome + personalInfoList?.exemptIncome + personalInfoList?.cryptoIncome + personalInfoList?.dividendIncome + personalInfoList?.housePropertyIncome + personalInfoList?.interestIncome + personalInfoList?.gainsFromStocks || "0"

    let TaxSavingDeductions = personalInfoList?.nonCashContribution + personalInfoList?.cashContribution + personalInfoList?.donation + personalInfoList?.insuranceParents + personalInfoList?.insuranceSelf + personalInfoList?.deduction80C || "0"
    let ItrFile1 = personalInfoList?.salaryIncome + personalInfoList?.housePropertyIncome + personalInfoList?.interestIncome
    let ItrFile2 = personalInfoList?.salaryIncome + personalInfoList?.housePropertyIncome + personalInfoList?.interestIncome + personalInfoList?.dividendIncome + personalInfoList?.gainsFromStocks
    let ItrFile3 = personalInfoList?.professionalIncome + personalInfoList?.cryptoIncome + personalInfoList?.exemptIncome

    let TaxableIcomeData = GrossIncome - TaxSavingDeductions

    // const handlePersonalinfoList = () => {
    //     const data = { _id: location?.state }
    //     axios
    //         .post("http://localhost:5000/api/user/get-single-user", data)
    //         .then((response) => {
    //             setPersonalInfoList(response?.data?.data)
    //             // console.log("response", response);
    //         });
    // }

    // useEffect(() => {
    //     handlePersonalinfoList()
    // }, [])

    // console.log("personalInfoList", personalInfoList);


    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Your Tax Summary</h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold">Gross Income</h3>
                <p>₹ {GrossIncome}</p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Taxable Income</h3>
                <p>₹ {TaxableIcomeData}</p>
                {/* <p>₹ {taxSummary?.taxableIncome || '0'}</p> */}
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Tax Liability</h3>
                <p>₹ {TaxableIcomeData > 300000 && TaxableIcomeData <= 600000
                    ? (TaxableIcomeData - 300000) * 0.05
                    : TaxableIcomeData > 600000 && TaxableIcomeData <= 900000
                        ? (TaxableIcomeData - 600000) * 0.1 + 15000
                        : TaxableIcomeData > 900000 && TaxableIcomeData <= 1200000
                            ? (TaxableIcomeData - 900000) * 0.15 + 45000
                            : TaxableIcomeData > 1200000 && TaxableIcomeData <= 1500000
                                ? (TaxableIcomeData - 1200000) * 0.2 + 90000
                                : TaxableIcomeData > 1500000
                                    ? (TaxableIcomeData - 1500000) * 0.3 + 150000
                                    : 0}</p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Taxes Paid</h3>
                <p>₹ 0</p>
            </div>

            <div className="mb-4">
                {/* <h3 className="text-lg font-semibold">You have selected {taxSummary?.selectedRegime}</h3> */}
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Compare Regimes</h3>
                <p>As per Income Tax Dept., you cannot file a Belated Return under Old Regime.</p>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Optimise your tax and Double-check your important data</h3>
                <p>Home Loan Interest Claimed: ₹ 0 (Max Limit: ₹ 200000)</p>
            </div>

            <h3 className="text-lg font-semibold">YOUR TAX BREAK-UP</h3>
            <div className="mb-4">
                <h4 className="text-md font-semibold">Personal Information</h4>
                <p>Name: {`${personalInfoList?.firstName} ${personalInfoList?.middleName} ${personalInfoList?.lastName}`}</p>
                <p>Date of birth: { new Date(personalInfoList?.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).replace(',', '')}</p>
                <p>PAN: {personalInfoList?.pan}</p>
                <p>Assessment Year: 2024 - 2025</p>
                <p>ITR Type:{ItrFile1 <= 5000000 ? "ITR1" : ItrFile2 > 5000000 ? "ITR2" : ItrFile3 > 0 || ItrFile3 <= 20000000 ? "ITR3" : ItrFile3 > 20000000 ? "ITR4" : "No eligible for ITR"} </p>
                <p>Residential Status: Indian</p>
            </div>

            <div className="mb-4">
                <h4 className="text-md font-semibold">Income Sources</h4>
                {/* <p>Gross Total Income: ₹ {taxSummary?.grossIncome || '0'}</p> */}
                  {/* <p>Tax Savings (Deductions): ₹{TaxSavingDeductions} </p> */}
                <p>Total Deduction: ₹{TaxSavingDeductions}</p>
            </div>

            <div className="mb-4">
                {/* <h3 className="text-lg font-semibold">Tax Payable</h3> */}
                {/* <p>Total Taxable Income: ₹ {taxSummary?.grossIncome || '0'}</p> */}
                {/* <p>Total Tax: ₹ {taxSummary?.taxLiability || '0'}</p> */}
                {/* <p>Total Tax Payable: ₹ {taxSummary?.taxLiability || '0'}</p> */}
                {/* <p>Total Tax Paid: ₹ {taxSummary?.taxesPaid || '0'}</p> */}
            </div>
        </div>
    );
};

export default TaxSummary;
