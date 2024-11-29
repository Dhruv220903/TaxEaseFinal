
import React, { useEffect, useState } from "react";
import "./UserList.css"; // Import the CSS file
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllUserListComponent = () => {

    const [personalInfoListData, setPersonalInfoListData] = useState([])
    const navigate = useNavigate();
    // const [taxInfoList, settaxInfoList] = useState([])
    // const [incomeInfolist, setIncomeInfolist] = useState([])
    // const [allDataOfList, setAllDataOfList] = useState([])


    // "/get-all-users"
    // "/get-all-tax"
    // "/get-all-income"


    const handlePersonalinfoList = () => {
        axios
            .get("http://localhost:5000/api/user/get-all-users")
            .then((response) => {
                setPersonalInfoListData(response?.data?.data)
                // console.log("response", response);
            });
    }

const handleViewTaxSummary = (rowData) => {
    navigate('/tax-summary', { state: rowData });
}

    console.log("personalInfoListData", personalInfoListData)
    // useEffect(() => { mergeArrays() }, [personalInfoList])
    useEffect(() => {
        handlePersonalinfoList()
        // handleIncomeInfoList()
        // handletaxInfoList()
    }, [])
    return (
        <div className="user-table-container">
            <h2 className="table-title">User List</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Father's Name</th>
                        <th>Income</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Pan No</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {personalInfoListData?.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name ? user?.name : `${user?.firstName} ${user?.middleName} ${user?.lastName}`}</td>
                            <td>{user.fathersName}</td>
                            <td>{user.salaryIncome}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.pan}</td>
                            <td><button onClick={()=>{handleViewTaxSummary(user)}}>view</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default AllUserListComponent;




