import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteHospital, updateHospital } from '../../redux/hospitalSlice' // Import delete and update actions

const HospitalList = () => {
  const hospitals = useSelector((state) => state.hospital.hospitals)
  const dispatch = useDispatch()

  const [editMode, setEditMode] = useState(null) // Keep track of which hospital is being edited
  const [editFormData, setEditFormData] = useState({
    hospitalName: '',
    address: '',
    phone: '',
    email: '',
  })

  const handleDelete = (id) => {
    dispatch(deleteHospital({ id }))
  }

  const handleEdit = (hospital) => {
    setEditMode(hospital.id)
    setEditFormData({
      hospitalName: hospital.hospitalName,
      address: hospital.address,
      phone: hospital.phone,
      email: hospital.email,
    })
  }

  const handleUpdate = (id) => {
    dispatch(updateHospital({ id, updatedData: editFormData }))
    setEditMode(null) // Exit edit mode after updating
  }

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className='p-8'>
      <h2 className='text-2xl font-bold mb-6 text-white'>
        Registered Hospitals
      </h2>
      <div className='space-y-6'>
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className='bg-[#1a1a1a] p-6 rounded-lg shadow-lg text-white w-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl opacity-0 animate-fadeIn'
          >
            {editMode === hospital.id ? (
              <div>
                {/* Edit Form */}
                <input
                  type='text'
                  name='hospitalName'
                  value={editFormData.hospitalName}
                  onChange={handleInputChange}
                  className='w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white'
                  placeholder='Hospital Name'
                />
                <input
                  type='text'
                  name='address'
                  value={editFormData.address}
                  onChange={handleInputChange}
                  className='w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white'
                  placeholder='Address'
                />
                <input
                  type='tel'
                  name='phone'
                  value={editFormData.phone}
                  onChange={handleInputChange}
                  className='w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white'
                  placeholder='Phone'
                />
                <input
                  type='email'
                  name='email'
                  value={editFormData.email}
                  onChange={handleInputChange}
                  className='w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white'
                  placeholder='Email'
                />

                {/* Update and Cancel Buttons */}
                <button
                  onClick={() => handleUpdate(hospital.id)}
                  className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg mr-2'
                >
                  Update
                </button>
                <button
                  onClick={() => setEditMode(null)}
                  className='bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg'
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                {/* Hospital Details */}
                <h3 className='text-lg font-bold mb-2'>
                  {hospital.hospitalName}
                </h3>
                <p className='text-gray-400'>Address: {hospital.address}</p>
                <p className='text-gray-400'>Phone: {hospital.phone}</p>
                <p className='text-gray-400'>Email: {hospital.email}</p>

                {/* Edit and Delete Buttons */}
                <button
                  onClick={() => handleEdit(hospital)}
                  className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 mt-4 rounded-lg mr-2'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(hospital.id)}
                  className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 mt-4 rounded-lg'
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HospitalList
