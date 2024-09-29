import React, { useState } from 'react';
import {
  FaUserMd,
  FaUsers,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaUserCircle, // Import profile icon
} from 'react-icons/fa';

const Sidebar = ({ setActiveComponent }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    localStorage.setItem('isExpanded', !isExpanded);
  };

  return (
    <div
      className={`z-3 font-poppins h-screen flex-col justify-between text-white px-4 py-6 backdrop-blur-lg shadow-xl bg-[#151518] border border-gray-700 transform transition-all ${
        isExpanded ? 'w-[300px] max-w-[320px]' : 'w-[4.75rem]'
      } overflow-y-auto overflow-x-hidden sm:flex sm:inline-flex`}
    >
      <div className='w-full'>
        {/* Fixed toggle button at the top left */}
        <button
          onClick={toggleSidebar}
          className='absolute top-4 left-4 text-white focus:outline-none transition-transform duration-300'
        >
          {isExpanded ? (
            <FaAngleDoubleLeft className='text-lg' />
          ) : (
            <FaAngleDoubleRight className='text-lg' />
          )}
        </button>

        <div className='flex justify-between items-center p-6 border-b border-gray-700'>
          <h2 className={`${isExpanded ? 'block' : 'hidden'} text-lg font-normal`}>
            <span className='font-bold text-2xl'>D</span>ashboard
          </h2>
        </div>
        <ul className='p-4 pl-0 '>
          <li
            className='mb-2 hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors'
            onClick={() => setActiveComponent('AuthorizedDoctors')}
          >
            <FaUserMd className='mr-3 ml-2 text-sm' />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Authorized Doctors
            </span>
          </li>
          <li
            className='hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors'
            onClick={() => setActiveComponent('UnauthorizedDoctors')}
          >
            <FaUsers className='mr-3 ml-2 text-sm' />
            <span className={`${isExpanded ? 'block text-xs' : 'hidden'}`}>
              Unauthorized Doctors
            </span>
          </li>
        </ul>
      </div>

      {/* Profile Button at the bottom of the sidebar */}
      <li
       onClick={() => setActiveComponent('Signup')}

       className='flex  item-center p-2 pl-0 mt-auto cursor-pointer transition-colors hover:bg-[#1e1e22] rounded-lg'>
        <FaUserCircle className='mr-3 ml-2 text-sm' />
        <span className={`${isExpanded ? 'block text-xs' : 'hidden'}`}>Profile</span>
      </li>
    </div>
  );
};

export default Sidebar;
