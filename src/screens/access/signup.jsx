// SignUpPage.jsx
import React, { useState, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the back icon from MUI
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"; // Import the visibility icons
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Import the upload icon
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import IndexController from "../../API/index";
import axios from "axios";

const SignUpPage = () => {
  const [step, setStep] = useState(1); // 1: Name, 2: Email, 3: Password
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageError, setProfileImageError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch(); // Initialize useDispatch
  const fileInputRef = useRef(null); // Ref for the hidden file input

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the "login" route
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      setNameError("Please enter your name.");
    } else {
      setNameError("");
      setStep(2);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailError("");
      setStep(3);
    } else {
      setEmailError("Please enter a valid email address.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (password.trim() === "") {
      setPasswordError("Please enter a password.");
      return;
    }

    try {
      let profileImageUrl = null;

      if (profileImage) {
        // Upload profile image to Cloudinary
        const imageFormData = new FormData();
        imageFormData.append("file", profileImage);
        imageFormData.append("upload_preset", "kmzzjyam"); // Replace with your upload preset
        imageFormData.append("cloud_name", "dj3p3xvrj"); // Replace with your cloud name

        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dj3p3xvrj/image/upload",
          imageFormData
        );

        profileImageUrl = cloudinaryResponse.data.secure_url;
      }

      // Prepare user data
      const userData = {
        name,
        email,
        password,
        profileImage: profileImageUrl, // Include the image URL
      };

      console.log("User Data:", userData);

      // Call the API to register the user
      const response = await IndexController.registerUser(userData);

      if (response) {
        console.log("Sign-Up successful");
        localStorage.setItem("accessToken", response.accessToken);

        // Dispatch login action to save user state in Redux store
        dispatch(
          login({
            _id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            auth: true,
            role: response.user.role,
            profileImage: response.user.profileImage,
          })
        );

        // Redirect to the main page
        navigate("/main");
      } else {
        // Handle the case where response is falsy
        setPasswordError("Sign-Up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-Up failed", error);
      setPasswordError("Sign-Up failed. Please try again.");
    }
  };

  return (
    <div className="bg-black font-poppins font-light h-screen fixed w-full">
      {/* Back Icon */}
      <div className="absolute top-2 md:top-4 md:left-4">
        <button
          onClick={() => navigate("/")}
          className="text-white hover:text-gray-400 transition duration-200"
        >
          <ArrowBackIcon style={{ fontSize: "2rem" }} /> {/* Back Icon */}
        </button>
      </div>

      <div className="text-center pt-16 mb-8 md:mb-0">
        <img
          src="/medtalk-main.png" // Reference to the logo in the public directory
          alt="MedTalk Logo"
          className="mx-auto h-20 md:h-32" // Adjust size
        />
      </div>
      <div className="flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md text-white">
          <h2 className="text-lg font-normal text-center mb-12 md:mb-8">
            Ready to Explore? Create an Account Now.
          </h2>

          {step === 1 && (
            <form onSubmit={handleNameSubmit}>
              {/* Profile Image Upload Circle */}
              <div className="flex justify-center relative">
                <div
                  className="w-32 h-32 rounded-full bg-black border border-gray-700 flex items-center justify-center cursor-pointer overflow-hidden"
                  onClick={() => fileInputRef.current.click()}
                >
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <CloudUploadIcon className="text-gray-400" fontSize="large" />
                      <span className="text-gray-400 text-sm">Upload</span>
                    </div>
                  )}
                </div>
                {profileImage && (
                  <button
                    type="button"
                    className="absolute top-0 right-24 bg-[#151518] text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => setProfileImage(null)}
                  >
                    ×
                  </button>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setProfileImage(e.target.files[0]);
                    }
                  }}
                />
              </div>

              {profileImageError && (
                <p className="text-red-500 text-sm mt-1 text-center">
                  {profileImageError}
                </p>
              )}

              <div className="mb-4">
                <label htmlFor="name" className="block text-sm mb-2">
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  className={`w-full text-sm px-4 py-3 bg-black border  ${
                    nameError ? "border-red-500" : "border-gray-700"
                  } rounded-lg hover:border-white`}
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    color: "white",
                    transition: "background-color 0.3s",
                  }}
                />
                {nameError && (
                  <p className="text-red-500 text-sm mt-1">{nameError}</p>
                )}
              </div>
              <button
                type="submit"
                className="relative w-full mt-3 inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-800 hover:bg-gray-900 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900"
              >
                <span className="absolute inset-0 overflow-hidden rounded-lg">
                  <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative font-poppins z-10 px-4 py-2 space-x-2 rounded-lg bg-[#151518] ring-1 ring-gray-700 sm:px-3 sm:py-1 sm:text-sm md:px-6 md:py-3 md:space-x-2 md:text-normal">
                  Continue
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm  mb-2">
                  Email address*
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full text-sm px-4 bg-black py-3 border ${
                    emailError ? "border-red-500" : "border-gray-700"
                  } rounded-lg `}
                  placeholder="you@medtalk.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    color: "white",
                    transition: "background-color 0.3s",
                  }}
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
              <button
                type="submit"
                className="relative w-full mt-3 inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-800 hover:bg-gray-900 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900"
              >
                <span className="absolute inset-0 overflow-hidden rounded-lg">
                  <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative font-poppins z-10 px-4 py-2 space-x-2 rounded-lg bg-[#151518] ring-1 ring-gray-700 sm:px-3 sm:py-1 sm:text-sm md:px-6 md:py-3 md:space-x-2 md:text-normal">
                  Continue
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="relative w-full mt-3  inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-800 hover:bg-gray-900 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900 "
              >
                <span className="absolute inset-0 overflow-hidden rounded-lg">
                  <span className="absolute  inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative font-poppins z-10  px-4 py-2 space-x-2 rounded-lg bg-[#151518] ring-1 ring-gray-700 sm:px-3 sm:py-1 sm:text-sm md:px-6 md:py-3 md:space-x-2 md:text-normal">
                  Back
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>
            </form>
          )}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="">
                <label htmlFor="password" className="block text-sm mb-2">
                  Password*
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle between text and password type
                    id="password"
                    className={`w-full px-4 py-2 bg-black border ${
                      passwordError ? "border-red-500" : "border-gray-700"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      color: "white",
                      transition: "background-color 0.3s",
                    }}
                  />
                  {/* Show/Hide Password Toggle Icon Inside Input Field */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 focus:outline-none"
                  >
                    {showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>

              <button
                type="submit"
                className="relative w-full mt-3 inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-800 hover:bg-gray-900 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900"
              >
                <span className="absolute inset-0 overflow-hidden rounded-lg">
                  <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative font-poppins z-10 px-4 py-2 space-x-2 rounded-lg bg-[#151518] ring-1 ring-gray-700 sm:px-3 sm:py-1 sm:text-sm md:px-6 md:py-3 md:space-x-2 md:text-normal">
                  Sign Up
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="relative w-full mt-3  inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-800 hover:bg-gray-900 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900 "
              >
                <span className="absolute inset-0 overflow-hidden rounded-lg">
                  <span className="absolute  inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative font-poppins z-10  px-4 py-2 space-x-2 rounded-lg bg-[#151518] ring-1 ring-gray-700 sm:px-3 sm:py-1 sm:text-sm md:px-6 md:py-3 md:space-x-2 md:text-normal">
                  Back
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button className="w-full bg-white text-gray-800 py-2 rounded-md hover:bg-gray-100 transition duration-200 transform hover:scale-105 flex items-center justify-center">
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-color-icon.png"
                alt="Google Icon"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </button>
          </div>
          <div className="mt-6 text-sm text-center">
            <p>
              Already have an account?{" "}
              <a
                onClick={handleLoginClick}
                href="#"
                className="text-gray-400 hover:underline"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
