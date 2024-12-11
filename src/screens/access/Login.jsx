import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the back icon from MUI
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"; // Import the visibility icons
import LoginController from "../../API/index";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";

const LoginPage = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: Password
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignUpClick = () => {
    navigate("/SignUp"); // Navigate to the "SignUp" route
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (step === 1) {
      if (emailRegex.test(email)) {
        setEmailError("");
        setStep(2);
      } else {
        setEmailError("Please enter a valid email address.");
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending login credentials");
      const response = await LoginController.login({ email, password });
      console.log("response ", response);
      if (response) {
        console.log("Login successful");
        localStorage.setItem("accessToken", response.accessToken);
        dispatch(
          login({
            _id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            auth: true,
            role: response.user.role,
            profileImage: response.user.profileImage
            
          })
        );
        if (response.user.role === "user" || response.user.role === "doctor")
          navigate("/main");
        else if (response.user.role === "hospital")
          navigate("/hospitaldashboard");
        else if (response.user.role === "admin") navigate("/dashboard");
        else if (response.user.role === "radiologist") navigate("/radiologist");

      } else {
        // Handle the case where response is falsy (e.g., login failed)
        setPasswordError("Email or password is incorrect.");
      }
    } catch (error) {
      console.error("Login failed", error);
      setPasswordError("Email or password is incorrect.");
    }
  };

  return (
    <div className="bg-black font-poppins font-light h-screen fixed w-full">
      {/* Back Icon */}
      <div className="absolute top-2 md:top-4 md:left-4 ">
        <button
          onClick={() => navigate("/")}
          className="text-white hover:text-gray-400 transition duration-200"
        >
          <ArrowBackIcon style={{ fontSize: "2rem" }} />
        </button>
      </div>

      <div className="text-center pt-16 mb-8 md:mb-0">
        <img
          src="/medtalk-main.png" // Reference to the logo in the public directory
          alt="MedTalk Logo"
          className="mx-auto h-20 md:h-32" // Adjust size (h-32 = 8rem, md:h-48 = 12rem for larger screens)
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md text-white">
          <h2 className="text-lg pb-4 font-poppins font-normal text-center mb-12 md:mb-4">
            Already a Member? Let’s Get You In.
          </h2>

          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm mb-2">
                  Email address*
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full px-4 py-3 text-sm border bg-black ${
                    emailError ? "border-red-500" : "border-gray-700"
                  } rounded-lg hover:border-white`}
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
                className="relative w-full mt-3 inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-800 hover:bg-gray-900 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900 "
              >
                <span className="absolute inset-0 overflow-hidden rounded-lg">
                  <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative text-sm font-poppins z-10 px-4 py-2 space-x-2 rounded-lg bg-[#151518] ring-1 ring-gray-700">
                  Continue
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>
            </form>
          )}
          {step === 2 && (
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
                      passwordError ? "border-red-500" : "border-gray-300"
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
                  <p className="text-red-500 text-sm mt-1">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="relative w-full mt-3 inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-800 hover:bg-gray-900 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900 "
              >
                <span className="absolute inset-0 overflow-hidden rounded-lg">
                  <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative font-poppins text-sm z-10 px-4 py-2 space-x-2 rounded-lg bg-[#151518] ring-1 ring-gray-700">
                  Sign In
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => {
                  setPasswordError("");
                  setPassword("");
                  setStep(1);
                }}
                className="relative w-full mt-3 inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-800 hover:bg-gray-900 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900 "
              >
                <span className="absolute inset-0 overflow-hidden rounded-lg">
                  <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative font-poppins text-sm z-10 px-4 py-2 space-x-2 rounded-lg bg-[#151518] ring-1 ring-gray-700">
                  Back
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>
            </form>
          )}
          <div className="mt-6 text-center">
            <button className="w-full group bg-white text-gray-800 py-2 rounded-lg p-px hover:bg-gray-100 transition duration-200 transform hover:scale-105 flex items-center justify-center">
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-color-icon.png"
                alt="Google Icon"
                className="w-5 h-5 mr-2"
              />
              <span className="font-poppins">Continue with Google</span>
            </button>
          </div>
          <div className="mt-6 text-sm text-center">
            <p>
              <span>Don't have an account?</span>{" "}
              <a
                onClick={handleSignUpClick}
                href="#"
                className="text-gray-400 hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
