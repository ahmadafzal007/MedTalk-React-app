import React, { useState } from 'react'
import {
  FaUserMd,
  FaUserPlus,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'

const Sidebar = ({ setActiveComponent }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={`bg-gray-800 text-white h-full  ${
        isCollapsed ? 'w-20' : 'w-64'
      } transition-all duration-300`}
    >
      <div className='flex justify-between items-center p-4 border-b border-gray-700'>
        <h2 className={`${isCollapsed ? 'hidden' : ''} text-xl font-bold`}>
          Dashboard
        </h2>
        <button
          onClick={toggleSidebar}
          className='text-white focus:outline-none transition-transform duration-300'
        >
          {isCollapsed ? (
            <FaChevronRight className='text-lg' />
          ) : (
            <FaChevronLeft className='text-lg' />
          )}
        </button>
      </div>
      <ul className='p-4'>
        <li
          className='mb-6 flex items-center cursor-pointer transition-colors hover:text-blue-400'
          onClick={() => setActiveComponent('AuthorizedDoctors')}
        >
          <FaUserMd className='mr-3 text-lg' />
          <span className={`${isCollapsed ? 'hidden' : ''}`}>
            Authorized Doctors
          </span>
        </li>
        <li
          className='mb-6 flex items-center cursor-pointer transition-colors hover:text-blue-400'
          onClick={() => setActiveComponent('UnauthorizedDoctors')}
        >
          <FaUsers className='mr-3 text-lg' />
          <span className={`${isCollapsed ? 'hidden' : ''}`}>
            Unauthorized Doctors
          </span>
        </li>
        <li
          className='flex items-center cursor-pointer transition-colors hover:text-blue-400'
          onClick={() => setActiveComponent('Signup')}
        >
          <FaUserPlus className='mr-3 text-lg' />
          <span className={`${isCollapsed ? 'hidden' : ''}`}>Signup</span>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
