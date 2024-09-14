import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerHospital } from '../../redux/hospitalSlice'
import ConfirmationModal from './ConfirmationModal' // Import the confirmation modal

const RegisterHospital = () => {
  const [formData, setFormData] = useState({
    hospitalName: '',
    address: '',
    phone: '',
    email: '',
  })

  const [showConfirmation, setShowConfirmation] = useState(false) // To control the confirmation modal
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerHospital(formData)) // Dispatch the action to register the hospital
    setShowConfirmation(true) // Show the confirmation modal
    setFormData({ hospitalName: '', address: '', phone: '', email: '' }) // Clear the form
  }

  return (
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-white'>
          Register a New Hospital
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='hospitalName'
              className='block text-sm font-medium text-gray-300 mb-2'
            >
              Hospital Name
            </label>
            <input
              type='text'
              id='hospitalName'
              name='hospitalName'
              value={formData.hospitalName}
              onChange={handleChange}
              className='w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white'
              placeholder="Enter hospital's name"
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='address'
              className='block text-sm font-medium text-gray-300 mb-2'
            >
              Address
            </label>
            <input
              type='text'
              id='address'
              name='address'
              value={formData.address}
              onChange={handleChange}
              className='w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white'
              placeholder="Enter hospital's address"
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='phone'
              className='block text-sm font-medium text-gray-300 mb-2'
            >
              Phone
            </label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              className='w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white'
              placeholder="Enter hospital's phone number"
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-300 mb-2'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white'
              placeholder="Enter hospital's email"
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-lg'
          >
            Register Hospital
          </button>
        </form>
      </div>

      {/* Show Confirmation Modal after submission */}
      {showConfirmation && (
        <ConfirmationModal
          message='Hospital Registered Successfully'
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  )
}

export default RegisterHospital
