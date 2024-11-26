import React, { useState } from 'react'


const DoctorSignup = () => {
  const hospital = {
    imageUrl: 'https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=612x612&w=gi&k=20&c=1-EC4Mxf--5u4ItDIzrIOrduXlbKRnbx9xWWtiifrDo=',
    name: 'City General Hospital',
    phoneNumber: '(123) 456-7890',
    type: 'Non-Profit',
    email: 'info@citygeneralhospital.org',
    licenseNumber: 'HOSP-123456',
    address: '123 Health St, Wellness City, State 54321'
  };

  return (
    <div className='p-6 font-poppins bg-black border border-gray-600 text-gray-200 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-semibold mb-4 text-center text-gray-100'>Hospital Profile</h2>
      <div className='flex flex-col items-center mb-6'>
        <img
          src={hospital.imageUrl}
          alt='Hospital'
          className='w-40 h-32 object-contain rounded-lg border-2 border-gray-500 mb-3 shadow-md'
        />
        <h3 className='text-lg font-medium'>{hospital.name}</h3>
        <p className='text-sm text-gray-400'>{hospital.type}</p>
      </div>
      <div className='space-y-3 text-sm'>
        <p className='flex justify-between text-gray-300'>
          <span className='font-medium'>Phone Number:</span>
          <span>{hospital.phoneNumber}</span>
        </p>
        <p className='flex justify-between text-gray-300'>
          <span className='font-medium'>Email:</span>
          <span>{hospital.email}</span>
        </p>
        <p className='flex justify-between text-gray-300'>
          <span className='font-medium'>License Number:</span>
          <span>{hospital.licenseNumber}</span>
        </p>
        <p className='flex justify-between text-gray-300'>
          <span className='font-medium'>Address:</span>
          <span className='text-right'>{hospital.address}</span>
        </p>
      </div>

    </div>
  );
};

export default DoctorSignup
