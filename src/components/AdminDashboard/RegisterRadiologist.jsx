import React, { useState } from 'react'
import ConfirmationModal from './ConfirmationModal' // Import the confirmation modal

const RegisterRadiologist = () => {
  const [formData, setFormData] = useState({
    radiologistName: '',
    email: '',
    phone: '',
  })
  const [radiologists, setRadiologists] = useState([]) // Dummy data array for radiologists
  const [editMode, setEditMode] = useState(null) // To track if we're in edit mode and which radiologist is being edited
  const [showConfirmation, setShowConfirmation] = useState(false) // To control the confirmation modal

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editMode !== null) {
      // Update existing radiologist in dummy data
      setRadiologists((prevRadiologists) =>
        prevRadiologists.map((radiologist) =>
          radiologist.id === editMode ? { ...radiologist, ...formData } : radiologist
        )
      )
      setEditMode(null) // Exit edit mode
    } else {
      // Register a new radiologist in dummy data
      const newRadiologist = {
        id: Date.now(), // Generate a unique ID
        ...formData,
      }
      setRadiologists([...radiologists, newRadiologist])
    }

    setFormData({ radiologistName: '', email: '', phone: '' }) // Clear the form
    setShowConfirmation(true) // Show confirmation modal
  }

  const handleEdit = (radiologist) => {
    setFormData({
      radiologistName: radiologist.radiologistName,
      email: radiologist.email,
      phone: radiologist.phone,
    })
    setEditMode(radiologist.id) // Enter edit mode
  }

  const handleDelete = (id) => {
    // Remove radiologist from dummy data
    setRadiologists((prevRadiologists) =>
      prevRadiologists.filter((radiologist) => radiologist.id !== id)
    )
  }

  return (
    <div className='min-h-screen bg-gray-900 flex flex-col items-center justify-center'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-white'>
          {editMode ? 'Edit Radiologist' : 'Register a New Radiologist'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='radiologistName'
              className='block text-sm font-medium text-gray-300 mb-2'
            >
              Radiologist Name
            </label>
            <input
              type='text'
              id='radiologistName'
              name='radiologistName'
              value={formData.radiologistName}
              onChange={handleChange}
              className='w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white'
              placeholder="Enter radiologist's name"
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
              placeholder="Enter radiologist's email"
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
              placeholder="Enter radiologist's phone number"
              required
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-lg'
          >
            {editMode ? 'Update Radiologist' : 'Register Radiologist'}
          </button>
        </form>
      </div>

      {/* Show Confirmation Modal after submission */}
      {showConfirmation && (
        <ConfirmationModal
          message={
            editMode
              ? 'Radiologist Updated Successfully'
              : 'Radiologist Registered Successfully'
          }
          onClose={() => setShowConfirmation(false)}
        />
      )}

      {/* Display the registered radiologists */}
      <div className='bg-gray-800 p-6 mt-8 rounded-lg shadow-lg w-full max-w-lg'>
        <h2 className='text-xl font-bold mb-6 text-center text-white'>
          Registered Radiologists
        </h2>
        {radiologists.length > 0 ? (
          <ul className='space-y-4'>
            {radiologists.map((radiologist) => (
              <li
                key={radiologist.id}
                className='bg-gray-700 p-4 rounded-lg shadow-md text-white'
              >
                <p className='font-bold'>{radiologist.radiologistName}</p>
                <p className='text-gray-400'>Email: {radiologist.email}</p>
                <p className='text-gray-400'>Phone: {radiologist.phone}</p>
                <div className='mt-4 flex space-x-2'>
                  <button
                    onClick={() => handleEdit(radiologist)}
                    className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(radiologist.id)}
                    className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg'
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-400 text-center'>
            No radiologists registered yet.
          </p>
        )}
      </div>
    </div>
  )
}

export default RegisterRadiologist
