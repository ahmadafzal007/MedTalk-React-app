import React from 'react'
import { Folder } from 'lucide-react' // Using icons for better UI feedback

const RadiologistPageSidebar = ({ onSelectFolder }) => {
  return (
    <div className='fixed top-0 left-0 w-64 bg-gray-800 text-white h-screen p-6 overflow-y-auto'>
      <h2 className='text-2xl font-bold mb-8 text-center border-b-2 pb-4'>
        Folders
      </h2>

      <h3 className='text-lg font-semibold mb-4'>Chest</h3>
      <ul className='space-y-4'>
        <li
          className='flex items-center cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-200'
          onClick={() => onSelectFolder('Chest_Normal')}
        >
          <Folder className='mr-2' />
          Normal
        </li>
        <li
          className='flex items-center cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-200'
          onClick={() => onSelectFolder('Chest_Pneumonia')}
        >
          <Folder className='mr-2' />
          Pneumonia
        </li>
        <li
          className='flex items-center cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-200'
          onClick={() => onSelectFolder('Chest_COVID')}
        >
          <Folder className='mr-2' />
          COVID-19
        </li>
        <li
          className='flex items-center cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-200'
          onClick={() => onSelectFolder('Chest_Other')}
        >
          <Folder className='mr-2' />
          Other
        </li>
      </ul>

      <h3 className='text-lg font-semibold mt-10 mb-4'>Kidney</h3>
      <ul className='space-y-4'>
        <li
          className='flex items-center cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-200'
          onClick={() => onSelectFolder('Kidney_Normal')}
        >
          <Folder className='mr-2' />
          Normal
        </li>
        <li
          className='flex items-center cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-200'
          onClick={() => onSelectFolder('Kidney_Infection')}
        >
          <Folder className='mr-2' />
          Infection
        </li>
        <li
          className='flex items-center cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-200'
          onClick={() => onSelectFolder('Kidney_Tumor')}
        >
          <Folder className='mr-2' />
          Tumor
        </li>
        <li
          className='flex items-center cursor-pointer hover:bg-gray-700 p-3 rounded-lg transition-all duration-200'
          onClick={() => onSelectFolder('Kidney_Other')}
        >
          <Folder className='mr-2' />
          Other
        </li>
      </ul>
    </div>
  )
}

export default RadiologistPageSidebar
