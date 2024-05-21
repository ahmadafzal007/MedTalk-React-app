import React from "react";
import { useNavigate, Link } from 'react-router-dom';




const Header = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/access');
  };



  return (
    
    <div className="w-full top-0 text-white py-7 flex justify-between items-center border-b-[1px] border-b-white-800">
      <div className="flex">
        {/* <img src={img} alt="logo" className="h-8 w-8 ml-4" /> */}
        <Link to={"/"} className=" text-2xl font-bold ml-5 text-white-900  ">MedTalk</Link>
      </div>
      <div>
        <ul className="flex gap-6 text-l  font-bold pr-4">
          
          <li>
            <Link to={"/access"} >
            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900  focus:outline-none focus:bg-gray-800 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-gray-800 dark:hover:bg-gray-900 dark:focus:bg-gray-800">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
            <span class="sr-only">Icon description</span>
          </button>
          </Link>
          </li>
          
        </ul>
       
      </div>
      
    </div>
  );
};

export default Header;