import React from "react";
import { useNavigate, Link } from 'react-router-dom';




const Header = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/access');
  };



  return (
    
    <div className="w-full fixed top-0 text-white py-7 flex justify-between items-center border-b-[1px] border-b-white-800">
      <div className="flex">
        {/* <img src={img} alt="logo" className="h-8 w-8 ml-4" /> */}
        <Link to={"/"} className=" text-2xl font-bold ml-5 text-white-900  ">MedTalk</Link>
      </div>
      <div>
        <ul className="flex gap-6 text-l  font-bold pr-4">
          <Link to={"/faq"}>
            
          <li className="pt-2 text-white-900 mr-8">FAQs</li>
            
          </Link>
        
          
        </ul>
       
      </div>
      
    </div>
  );
};

export default Header;