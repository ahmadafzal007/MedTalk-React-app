import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import LoginIcon from "@mui/icons-material/Login"; // Import the Login icon from MUI

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the "login" route
  };

  return (
    <div className="w-full fixed top-0 text-white py-7 flex justify-between items-center border-b-[1px] border-b-white-800 z-50">
      <div className="flex">
        <Link
          to={"/"}
          className="font-permanent text-2xl font-bold ml-5 text-white-900"
        >
          MedTalk
        </Link>
      </div>
      <div>
        <ul className="flex md:gap-3 text-l font-bold pr-4">
          <li>
            <button className="hidden border-1 md:block pt-2 font-thin text-lg font-inconsolata text-white-900">
              Try MedTalk Pro
            </button>
          </li>
          <Link to={"/faq"}>
            <li>
              <button className="pt-2 font-thin border-1 font-inconsolata  text-lg  text-white-900">
                FAQs
              </button>
            </li>
          </Link>
          <li>
            <button
              type="button"
              className="text-white hidden md:block shadow-2xl border-1 border-gray-500 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2"
              onClick={handleLoginClick} // Call handleLoginClick on button click
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
