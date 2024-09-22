import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUnauthorizedDoctor } from '../../../redux/doctorSlice'

const DoctorSignup = () => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    profilePicture: null,
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    gender: '',
    medicalLicenseNumber: '',
    specialization: '',
    department: '',
    hospital: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'profilePicture') {
      setFormData({ ...formData, profilePicture: e.target.files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(addUnauthorizedDoctor(formData))

    setFormData({
      profilePicture: null,
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      gender: '',
      medicalLicenseNumber: '',
      specialization: '',
      department: '',
      hospital: '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-gray-800 p-10 rounded-xl shadow-2xl w-full max-w-4xl  animate-fadeIn m-auto '
    >
      <h2 className='text-3xl font-bold mb-8 text-center text-white'>
        Doctor Signup
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='col-span-1'>
          <input
            type='file'
            name='profilePicture'
            accept='image/*'
            onChange={handleChange}
            className='mb-4 w-full text-white bg-gray-700 p-2 rounded cursor-pointer file:bg-gray-600 file:text-white file:border-none file:px-4 file:py-2 hover:file:bg-gray-500'
          />
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            required
            className='mb-4 w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            required
            className='mb-4 w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
            className='mb-4 w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='text'
            name='phoneNumber'
            placeholder='Phone Number'
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className='mb-4 w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='col-span-1'>
          <select
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            required
            className='mb-4 w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
          <input
            type='text'
            name='medicalLicenseNumber'
            placeholder='Medical License Number'
            value={formData.medicalLicenseNumber}
            onChange={handleChange}
            required
            className='mb-4 w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <select
            name='specialization'
            value={formData.specialization}
            onChange={handleChange}
            required
            className='mb-4 w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>Select Specialization</option>
            <option value='Cardiology'>Cardiology</option>
            <option value='Dermatology'>Dermatology</option>
            <option value='Pediatrics'>Pediatrics</option>
            <option value='Neurology'>Neurology</option>
          </select>
          <select
            name='department'
            value={formData.department}
            onChange={handleChange}
            required
            className='mb-4 w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>Select Department</option>
            <option value='General'>General</option>
            <option value='Emergency'>Emergency</option>
            <option value='Surgery'>Surgery</option>
            <option value='Pediatrics'>Pediatrics</option>
          </select>
          <input
            type='text'
            name='hospital'
            placeholder='Associated Hospital'
            value={formData.hospital}
            onChange={handleChange}
            required
            className='mb-4 w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
      </div>

      <button
        type='submit'
        className='w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        Sign Up
      </button>
    </form>
  )
}

export default DoctorSignup
