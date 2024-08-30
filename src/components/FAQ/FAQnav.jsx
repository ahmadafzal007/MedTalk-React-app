import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const Header = () => {
  return (
    <div className="w-full top-0 text-white py-7 flex justify-between items-center border-b-[1px] border-b-white-800">
      <div className="flex">
        <Link
          to={"/"}
          className=" text-2xl font-bold ml-5 text-white-900 font-permanent "
        >
          MedTalk
        </Link>
      </div>
      <div>
        <ul className="flex gap-6 text-l  font-bold pr-4">
          <li>
            <button
              type="button"
              className="text-white bg-gray-800  hover:bg-gray-900 focus:outline-none focus:bg-gray-800 border-1 border-gray-500 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 ring-1 ring-white/10"
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
