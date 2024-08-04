import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import backgroundImageUrl from '../../assets/BlurMed.png';
import { Link, useNavigate } from 'react-router-dom';
import AuthController from '../../API/index';

const SignUpForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        hospitalName: '',
        address: '',
        adminName: '',
        email: '',
        contactNo: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        if (!formData.hospitalName) {
            errors.hospitalName = 'Hospital name is required';
            formIsValid = false;
        }

        if (!formData.email) {
            errors.email = 'Email is required';
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
            formIsValid = false;
        }

        if (!formData.address) {
            errors.address = 'Address is required';
            formIsValid = false;
        }

        if (!formData.adminName) {
            errors.adminName = 'Admin name is required';
            formIsValid = false;
        }

        if (!formData.contactNo) {
            errors.contactNo = 'Contact number is required';
            formIsValid = false;
        }

        if (!formData.password) {
            errors.password = 'Password is required';
            formIsValid = false;
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            formIsValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            formIsValid = false;
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // {
                //     "name":"test",
                //     "email":"test12@gmail.com",
                //     "password":"1234",
                //     "role":"hospitalAdmin",
                //     "address":"islamabad",
                //     "contactNumber":"9324234234",
                //     "hospitalName":"CMH"
                //   }
                const data = {
                    name: formData.adminName,
                    email: formData.email,
                    password: formData.password,
                    role: "hospitalAdmin",
                    address: formData.address,
                    contactNumber: formData.contactNo,
                    hospitalName: formData.hospitalName,
                };
                const response = await AuthController.signup(data);
                if (response.success) {
                    localStorage.setItem("token",response.data.token)
                    navigate("/hospitalDB")
                } else {
                    // Handle signup failure    
                    console.log(response)
                }
            } catch (error) {
                // Handle error
            }
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <form className="w-full max-w-4xl bg-opacity-50 backdrop-filter font-serif backdrop-blur-lg shadow-md rounded border-2 border-gray-300 border-opacity-50 px-8 py-8 mb-4 relative" onSubmit={handleSubmit}>
                <button className="absolute top-4 right-4 text-white focus:outline-none">
                    <Link to="/access">
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </Link>
                </button>
                <h2 className="text-3xl text-center font-serif text-white mb-8">Sign Up</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4 col-span-2">
                        <div className="flex justify-between">
                            <div className="w-1/2 pr-2">
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="hospitalName">
                                    Name of the Hospital
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="hospitalName"
                                    type="text"
                                    name="hospitalName"
                                    placeholder="Enter hospital name"
                                    value={formData.hospitalName}
                                    onChange={handleChange}
                                />
                                {errors.hospitalName && <p className="text-red-500 text-xs italic">{errors.hospitalName}</p>}
                            </div>
                            <div className="w-1/2 pl-2">
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                                    Hospital Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 col-span-2">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="address">
                            Address of the Hospital
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            type="text"
                            name="address"
                            placeholder="Enter address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
                    </div>
                    <div className="mb-4 col-span-2">
                        <div className="flex justify-between">
                            <div className="w-1/2 pr-2">
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="adminName">
                                    Admin Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="adminName"
                                    type="text"
                                    name="adminName"
                                    placeholder="Enter admin name"
                                    value={formData.adminName}
                                    onChange={handleChange}
                                />
                                {errors.adminName && <p className="text-red-500 text-xs italic">{errors.adminName}</p>}
                            </div>
                            <div className="w-1/2 pl-2">
                                <label className="block text-white text-sm font-bold mb-2" htmlFor="contactNo">
                                    Contact Number
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="contactNo"
                                    type="text"
                                    name="contactNo"
                                    placeholder="Enter contact number"
                                    value={formData.contactNo}
                                    onChange={handleChange}
                                />
                                {errors.contactNo && <p className="text-red-500 text-xs italic">{errors.contactNo}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 col-span-1">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="******************"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>
                    <div className="mb-4 col-span-1">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="******************"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign Up
                    </button>
                    <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:underline">
                        Already have an account? Sign in
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
