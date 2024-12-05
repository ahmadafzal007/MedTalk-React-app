import React, { useEffect, useState } from 'react';

const DoctorProfile = ({ doctor, onBack }) => {
  const [profileImageUrl, setProfileImageUrl] = useState('default-profile.png');
  console.log('the doctor in doctor profile:', doctor);

  useEffect(() => {
    if (doctor && doctor.profilePicture) {
      if (doctor.profilePicture instanceof File || doctor.profilePicture instanceof Blob) {
        const objectUrl = doctor.profileImage;
        setProfileImageUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      } else {
        setProfileImageUrl(doctor.profilePicture);
      }
    } else {
      setProfileImageUrl('default-profile.png');
    }
  }, [doctor]);

  if (!doctor) return null;

  return (
    <div className='p-6 font-poppins bg-black border border-gray-600 text-gray-200 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-semibold mb-4 text-center text-gray-100'>Doctor Profile</h2>
      <div className='flex flex-col items-center mb-6'>
        <img
          src={doctor.user.profileImage}
          alt='Profile'
          className='w-32 h-32 object-contain rounded-full border-2 border-gray-500 mb-3 shadow'
        />
        <h3 className='text-lg font-medium'>{doctor.user.name}</h3>
        <p className='text-sm text-gray-400'> {doctor.department}</p>
      </div>
      <div className='space-y-3 text-sm'>
        <p className='flex justify-between text-gray-300'>
          <span className='font-medium'>Email:</span>
          <span>{doctor.user.email}</span>
        </p>
        <p className='flex justify-between text-gray-300'>
          <span className='font-medium'>Phone Number:</span>
          <span>{doctor.phoneNumber}</span>
        </p>
        <p className='flex justify-between text-gray-300'>
          <span className='font-medium'>Gender:</span>
          <span>{doctor.gender}</span>
        </p>
        <p className='flex justify-between text-gray-300'>
          <span className='font-medium'>Medical License:</span>
          <span>{doctor.medicalLicenseNumber}</span>
        </p>
      
      </div>
      <button
        onClick={onBack}
        className='mt-6 w-28 bg-[#151518] border border-gray-700 text-gray-200 px-4 py-2 rounded-md hover:bg-[#232328] transition-shadow duration-200 shadow-md'
      >
        Back
      </button>
    </div>
  );
};

export default DoctorProfile;
