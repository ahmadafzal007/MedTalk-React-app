import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import backgroundImageUrl from '../../assets/BlurMed.png';
import { Link, useNavigate } from 'react-router-dom';
import AuthController from '../../API/index';

const LoginForm = ({ role }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

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
                const data = {...formData,role}
                const response = await AuthController.login(data);
                if (response.success) {
                    setMessage('Login successful!');
                    localStorage.setItem('token',response.data.token)
                    if (role === 'hospitalAdmin'){
                        navigate("/hospitalDB")
                        console.log(response);
                    }else if (role === 'healthcareProfessional'){
                        const user = response.data.user;
                        console.log(user);
                        navigate("/mainDB")
                    }
                    // Handle successful login, e.g., redirect or save token
                } else {
                    setMessage(`Login failed: ${response.error}`);
                }
            } catch (error) {
                setMessage(`An error occurred: ${error.message}`);
            }
        }
    };

    return (
        <div style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh', // Alternatively, use Tailwind's h-screen class
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <form className="w-full max-w-md bg-opacity-50 backdrop-filter font-serif backdrop-blur-lg shadow-md rounded border-2 border-gray-300 border-opacity-50 px-8 py-8 mb-4 relative" onSubmit={handleSubmit}>
                <button className="absolute top-4 right-4 text-white focus:outline-none">
                    <Link to="/access">
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </Link>
                </button>
                <h2 className="text-3xl text-center font-serif text-white mb-8">Login</h2>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                        Email
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
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                    </button>
                    <Link to="/forgot-password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
                {role === 'Scholar' && (
                    <div className="mt-4 text-center">
                        <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-200 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                            <span>Continue with Google</span>
                        </button>
                    </div>
                )}
                {message && <p className="text-red-500 text-xs italic mt-4">{message}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
