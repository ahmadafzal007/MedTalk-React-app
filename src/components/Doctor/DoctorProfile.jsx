import React from 'react'

const DoctorProfile = ({ doctor, onBack }) => {
  if (!doctor) return null

  return (
    <div className='p-6 bg-gray-800 text-white rounded-lg shadow-lg'>
      <h2 className='text-3xl font-bold mb-6 text-center'>Doctor Profile</h2>
      <div className='flex flex-col items-center mb-4'>
        <img
          src={
            doctor.profilePicture
              ? URL.createObjectURL(doctor.profilePicture)
              : 'default-profile.png'
          }
          alt='Profile'
          className='w-32 h-32 rounded-full border-4 border-white mb-4'
        />
        <h3 className='text-xl font-semibold'>{doctor.name}</h3>
      </div>
      <div className='space-y-3'>
        <p className='flex justify-between'>
          <span className='font-bold'>Email:</span>
          <span>{doctor.email}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>Phone Number:</span>
          <span>{doctor.phoneNumber}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>Gender:</span>
          <span>{doctor.gender}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>Medical License Number:</span>
          <span>{doctor.medicalLicenseNumber}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>Specialization:</span>
          <span>{doctor.specialization}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>Department:</span>
          <span>{doctor.department}</span>
        </p>
        <p className='flex justify-between'>
          <span className='font-bold'>Hospital:</span>
          <span>{doctor.hospital}</span>
        </p>
      </div>
      <button
        onClick={onBack}
        className='mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition'
      >
        Back
      </button>
    </div>
  )
}

export default DoctorProfile
