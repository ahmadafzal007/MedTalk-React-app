import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the "login" route
  };

  return (
    <div className="w-full top-0 text-white py-7 flex justify-between items-center border-b-[1px] border-b-white-800">
      <div className="flex items-center">
      
      <Link
        to="/"
        className="text-2xl font-bold text-white-900 font-merriweather"
      >
        <img
        src="/medtalk-main.png" // Adjust the path if necessary
        alt="MedTalk Logo"
        className="h-10 w-auto ml-6" // Adjust size and margin as needed
      />
      </Link>
    </div>
      <div>
        <ul className="flex gap-6 text-l  font-bold pr-4">
          <li>
            <button
              type="button"
              onClick={handleLoginClick}
              className="border-white hidden border-1 md:block p-2 text-lg font-poppins text-white-900 transition-all duration-300 ease-in-out transform hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg"
              >
              <LoginIcon className="w-[8px] h-[8px]" />{" "}
              {/* Use the MUI Login icon */}
              <span className="sr-only">Sign In</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
