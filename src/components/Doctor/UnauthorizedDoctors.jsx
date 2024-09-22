import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { approveDoctor, declineDoctor } from '../../redux/doctorSlice'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import ClipLoader from 'react-spinners/ClipLoader' // Import a loader component

const UnauthorizedDoctors = () => {
  const dispatch = useDispatch()
  const { unauthorizedDoctors, loading } = useSelector((state) => ({
    unauthorizedDoctors: state.doctors.unauthorizedDoctors,
    loading: state.doctors.loading, // Assume you have a loading state in your redux slice
  }))

  const handleApprove = (email) => {
    dispatch(approveDoctor(email))
  }

  const handleDecline = (email) => {
    dispatch(declineDoctor(email))
  }

  return (
    <div className='w-full max-w-4xl bg-gray-800 p-10 rounded-lg shadow-lg animate-fadeIn m-auto mt-10'>
      <h2 className='text-3xl font-bold mb-6 text-white text-center'>
        Unauthorized Doctors
      </h2>

      {loading ? (
        <div className='flex justify-center'>
          <ClipLoader color='#36d7b7' loading={loading} size={50} />
        </div>
      ) : unauthorizedDoctors.length === 0 ? (
        <p className='text-gray-300 text-center'>
          No unauthorized doctors at the moment.
        </p>
      ) : (
        <ul>
          {unauthorizedDoctors.map((doctor) => (
            <li
              key={doctor.email}
              className='bg-gray-700 p-6 mb-4 rounded-lg shadow hover:shadow-xl transition-shadow duration-300 transform hover:scale-105'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-white'>
                <p>
                  <strong>Name:</strong> {doctor.name}
                </p>
                <p>
                  <strong>Email:</strong> {doctor.email}
                </p>
                <p>
                  <strong>Specialization:</strong> {doctor.specialization}
                </p>
                <p>
                  <strong>Hospital:</strong> {doctor.hospital}
                </p>
              </div>

              <div className='mt-4 flex justify-end'>
                <button
                  onClick={() => handleApprove(doctor.email)}
                  className='flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mr-2 transition-transform duration-300 transform hover:scale-105'
                >
                  <FaCheckCircle className='mr-2' />
                  Approve
                </button>
                <button
                  onClick={() => handleDecline(doctor.email)}
                  className='flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-transform duration-300 transform hover:scale-105'
                >
                  <FaTimesCircle className='mr-2' />
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UnauthorizedDoctors
