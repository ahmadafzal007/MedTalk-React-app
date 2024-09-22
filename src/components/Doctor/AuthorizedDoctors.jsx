import React from 'react'
import { useSelector } from 'react-redux'

const AuthorizedDoctors = ({ onSelectDoctor }) => {
  const authorizedDoctors = useSelector(
    (state) => state.doctors.authorizedDoctors
  )

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-center text-white mb-6'>
        Authorized Doctors
      </h2>
      {authorizedDoctors.length === 0 ? (
        <p className='text-gray-400 text-center'>
          No authorized doctors at the moment.
        </p>
      ) : (
        <ul>
          {authorizedDoctors.map((doctor) => (
            <li
              key={doctor.email}
              className='bg-gray-800 p-4 mb-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105'
            >
              <div className='flex items-center'>
                <img
                  src={doctor.profilePicture || 'default-profile.png'} // Use uploaded picture or a default image
                  alt={doctor.name}
                  className='w-12 h-12 rounded-full mr-4'
                />
                <div>
                  <p className='text-white'>
                    <strong>Name:</strong> {doctor.name}
                  </p>
                  <p className='text-gray-400'>
                    <strong>Email:</strong> {doctor.email}
                  </p>
                  <p className='text-gray-400'>
                    <strong>Specialization:</strong> {doctor.specialization}
                  </p>
                  <p className='text-gray-400'>
                    <strong>Hospital:</strong> {doctor.hospital}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onSelectDoctor(doctor)}
                className='bg-teal-600 text-white px-4 py-2 rounded mt-4 hover:bg-teal-700 transition-transform duration-300 transform hover:scale-105'
              >
                View Profile
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AuthorizedDoctors
