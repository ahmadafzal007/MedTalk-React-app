import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the back icon from MUI
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"; // Import the visibility icons

const SignUpPage = () => {
  const [step, setStep] = useState(1); // 1: Name, 2: Email, 3: Password
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the "login" route
  };
  const validPassword = "securepassword"; // Replace with your desired valid password

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

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === validPassword) {
      setPasswordError("");
      // Proceed with successful sign-up (e.g., redirect, store auth tokens, etc.)
      alert("Sign-Up successful!");
    } else {
      setPasswordError("Password does not meet the criteria.");
    }
  };

  return (
    <div className="bg-black font-inconsolata h-screen relative">
      {/* Back Icon */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/")}
          className="text-white hover:text-gray-400 transition duration-200"
        >
          <ArrowBackIcon style={{ fontSize: "2rem" }} /> {/* Back Icon */}
        </button>
      </div>

      <h1 className="text-7xl text-white font-permanent text-center pt-16 font-bold mb-8">
        MedTalk
      </h1>
      <div className="flex items-center justify-center">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 shadow-md ">
            Create your account
          </h2>
          {step === 1 && (
            <form onSubmit={handleNameSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-400 mb-2">
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  className={`w-full px-4 py-2 border ${
                    nameError ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    transition: "background-color 0.3s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.backgroundColor =
                      "rgba(255, 255, 255, 0.2)")
                  }
                  onBlur={(e) =>
                    (e.target.style.backgroundColor =
                      "rgba(255, 255, 255, 0.1)")
                  }
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
                <div className="relative font-inconsolata z-10 px-4 py-2 space-x-2 rounded-lg bg-gray-950/50 ring-1 ring-white/10 sm:px-3 sm:py-1 sm:text-sm md:px-6 md:py-3 md:space-x-2 md:text-base">
                  Continue
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-400 mb-2">
                  Email address*
                </label>
                <input
                  type="email"
                  id="email"
                  className={`w-full px-4 py-2 border ${
                    emailError ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="you@medtalk.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    transition: "background-color 0.3s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.backgroundColor =
                      "rgba(255, 255, 255, 0.2)")
                  }
                  onBlur={(e) =>
                    (e.target.style.backgroundColor =
                      "rgba(255, 255, 255, 0.1)")
                  }
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
                <div className="relative font-inconsolata z-10 px-4 py-2 space-x-2 rounded-lg bg-gray-950/50 ring-1 ring-white/10 sm:px-3 sm:py-1 sm:text-sm md:px-6 md:py-3 md:space-x-2 md:text-base">
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
                <div className="relative font-inconsolata z-10  px-4 py-2 space-x-2 rounded-lg bg-gray-950/50 ring-1 ring-white/10 sm:px-3 sm:py-1 sm:text-sm md:px-6 md:py-3 md:space-x-2 md:text-base">
                  Back
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
              </button>
            </form>
          )}
            {step === 3 && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="">
                <label htmlFor="password" className="block text-gray-400 mb-2">
                  Password*
                </label>
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password type
                  id="password"
                  className={`w-full px-4 py-2 border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    transition: "background-color 0.3s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.backgroundColor =
                      "rgba(255, 255, 255, 0.2)")
                  }
                  onBlur={(e) =>
                    (e.target.style.backgroundColor =
                      "rgba(255, 255, 255, 0.1)")
                  }
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>

              {/* Show/Hide Password Toggle Icon */}
              <div className="flex justify-start items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400  hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="relative w-full mt-3 inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-800 hover:bg-gray-900 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900"
              >
                <span className="absolute inset-0 overflow-hidden rounded-lg">
                  <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative font-inconsolata z-10 px-4 py-2 space-x-2 rounded-lg bg-gray-950/50 ring-1 ring-white/10 sm:px-3 sm:py-1 sm:text-sm md:px-6 md:py-3 md:space-x-2 md:text-base">
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
                <div className="relative font-inconsolata z-10  px-4 py-2 space-x-2 rounded-lg bg-gray-950/50 ring-1 ring-white/10 sm:px-3 sm:py-1 sm:text-sm md:px-6 md:py-3 md:space-x-2 md:text-base">
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
          <div className="mt-6 text-center">
            <p>
              Already have an account?{" "}
              <a onClick={handleLoginClick} href="#" className="text-gray-400 hover:underline">
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
