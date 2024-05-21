import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import backgroundImageUrl from '../../assets/BlurMed.png';
import { Link } from 'react-router-dom';

const DoctorSignUpForm = () => {
    const [formData, setFormData] = useState({
        hospital: '',
        name: '',
        doctorId: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        if (!formData.hospital) {
            errors.hospital = 'Hospital selection is required';
            formIsValid = false;
        }

        if (!formData.name) {
            errors.name = 'Name is required';
            formIsValid = false;
        }

        if (!formData.doctorId) {
            errors.doctorId = 'Doctor ID is required';
            formIsValid = false;
        }

        if (!formData.email) {
            errors.email = 'Email is required';
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form is valid');
            // Handle form submission here
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
                    <Link to={"/access"}>
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </Link>
                </button>
                <h2 className="text-3xl text-center font-serif text-white mb-8">Sign Up</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4 col-span-2">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="hospital">
                            Select Hospital
                        </label>
                        <div className="relative">
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="hospital"
                                name="hospital"
                                value={formData.hospital}
                                onChange={handleChange}
                            >
                                <option value="">Select hospital</option>
                                <option value="Hospital A">CMH</option>
                                <option value="Hospital B">Shifa Medical Complex</option>
                                <option value="Hospital C">Benazir Bhutto Medical Complex</option>
                            </select>
                            <FontAwesomeIcon icon={faCaretDown} className="absolute top-1/2 right-6 transform -translate-y-1/2 text-gray-700" />
                        </div>
                        {errors.hospital && <p className="text-red-500 text-xs italic">{errors.hospital}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="doctorId">
                            Doctor ID
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="doctorId"
                            type="text"
                            name="doctorId"
                            placeholder="Enter your Doctor ID"
                            value={formData.doctorId}
                            onChange={handleChange}
                        />
                        {errors.doctorId && <p className="text-red-500 text-xs italic">{errors.doctorId}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
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
                    <div className="mb-4">
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
                    <Link to={'/mainDB'}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign Up
                    </button>
                    </Link>
                   
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 " href="#">
                        <span className='text-white'>Already have an account? </span> <span className=' text-base hover:underline'> Sign in</span>
                    </a>
                </div>
            </form>
        </div>
    );
};

export default DoctorSignUpForm;
