import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalInfo = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        fathersName: '',
        gender: '',
        maritalStatus: '',
        aadhaar: '',
        pan: '',
        mobile: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error on change
    };

    const validateForm = () => {
        const newErrors = {};
        const aadhaarRegex = /^\d{12}$/;
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

        if (!aadhaarRegex.test(formData.aadhaar)) {
            newErrors.aadhaar = 'Aadhaar must be a 12-digit numeric value.';
        }

        if (!panRegex.test(formData.pan)) {
            newErrors.pan = 'PAN must follow the format: 5 letters, 4 digits, 1 letter.';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Axios call can be uncommented for backend integration
        // axios
        //     .post("http://localhost:5000/api/user/add-edit-profile", formData, {
        //         withCredentials: true,
        //     })
        //     .then((response) => {
        //         console.log("response", response);
        //     });

        navigate('/income-sources', { state: formData });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-semibold mb-4">Permanent Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Name*</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2"
                            required
                        />
                        <input
                            type="text"
                            name="middleName"
                            placeholder="Middle Name"
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2 mt-2"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2 mt-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Date of Birth*</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Father's Name*</label>
                        <input
                            type="text"
                            name="fathersName"
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Gender*</label>
                        <select
                            name="gender"
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2"
                            required
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Marital Status</label>
                        <select
                            name="maritalStatus"
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2"
                        >
                            <option value="">Select</option>
                            <option value="married">Married</option>
                            <option value="unmarried">Unmarried</option>
                        </select>
                    </div>
                </div>
                <h3 className="text-lg font-semibold mt-4">Identification & Contact Details</h3>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Aadhaar Number*</label>
                        <input
                            type="text"
                            name="aadhaar"
                            onChange={handleChange}
                            className={`border ${errors.aadhaar ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full p-2`}
                            required
                        />
                        {errors.aadhaar && <p className="text-red-500 text-sm">{errors.aadhaar}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">PAN*</label>
                        <input
                            type="text"
                            name="pan"
                            onChange={handleChange}
                            className={`border ${errors.pan ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full p-2`}
                            required
                        />
                        {errors.pan && <p className="text-red-500 text-sm">{errors.pan}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Mobile No*</label>
                        <input
                            type="text"
                            name="mobile"
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email*</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2"
                            required
                        />
                    </div>
                </div>
                <h3 className="text-lg font-semibold mt-4">Your Address</h3>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Address*</label>
                        <input
                            type="text"
                            name="address"
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">City*</label>
                        <input
                            type="text"
                            name="city"
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">State*</label>
                        <input
                            type="text"
                            name="state"
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Pincode*</label>
                        <input
                            type="text"
                            name="pincode"
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg w-full p-2"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4">Next</button>
            </form>
        </div>
    );
};

export default PersonalInfo;
