import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import LoginIcon from "@mui/icons-material/Login"; // Import the Login icon from MUI

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the "login" route
  };

  const handleMedTalkProClick = () => {
    navigate("/medtalkpro"); // Navigate to the "medtalkpro" route
  };

  return (
    <div className="w-full fixed top-0 text-white py-5 flex justify-between items-center border-b-[1px] border-b-white-800 z-50">
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
        <ul className="flex md:gap-3 text-l pr-4">
          <li>
            <button
              onClick={handleMedTalkProClick} // Call handleMedTalkProClick on button click
              className="hover:border-white hidden border-1 font-light md:block p-2 text-md font-poppins text-white-900 transition-all duration-300 ease-in-out transform hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg"
            >
              Try MedTalk Pro
            </button>
          </li>

          <Link to={"/faq"}>
            <li>
              <button className="hover:border-white font-light border-1 md:block p-2 text-md font-poppins text-white-900 transition-all duration-300 ease-in-out transform hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg">
                FAQs
              </button>
            </li>
          </Link>
          <li>
            <button
              type="button"
              className="hidden border-1 rounded-full md:block p-2 font-poppins text-white-900 transition-all duration-300 ease-in-out transform hover:bg-black hover:text-white hover:scale-105 hover:shadow-lg"
              onClick={handleLoginClick} // Call handleLoginClick on button click
            >
              <LoginIcon className="w-[4px] h-[4px]" />{" "}
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
