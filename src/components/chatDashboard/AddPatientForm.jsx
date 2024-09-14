import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPatient } from '../../redux/patientSLice' // Import addPatient action

const AddPatientForm = ({ setShowForm }) => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [condition, setCondition] = useState('')

  const dispatch = useDispatch()
  const patients = useSelector((state) => state.patients.patientList) // Get patient list from Redux

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPatient = { name, age, condition }

    dispatch(addPatient(newPatient)) // Dispatch add patient action
    setName('') // Reset input fields after submission
    setAge('')
    setCondition('')
  }

  return (
    <div className='max-w-lg mx-auto p-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg'>
      <h2 className='text-xl font-bold mb-4 text-gray-100'>Add New Patient</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-400'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            className='w-full p-3 border border-gray-700 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 transition'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter patient's name"
            required
          />
        </div>

        {/* Age Input */}
        <div className='mb-4'>
          <label
            htmlFor='age'
            className='block mb-2 text-sm font-medium text-gray-400'
          >
            Age
          </label>
          <input
            type='number'
            id='age'
            className='w-full p-3 border border-gray-700 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 transition'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter patient's age"
            required
          />
        </div>

        {/* Condition Input */}
        <div className='mb-4'>
          <label
            htmlFor='condition'
            className='block mb-2 text-sm font-medium text-gray-400'
          >
            Condition
          </label>
          <input
            type='text'
            id='condition'
            className='w-full p-3 border border-gray-700 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 transition'
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="Enter patient's condition"
            required
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className='flex justify-between mt-6'>
          <button
            type='submit'
            className='bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg transition'
          >
            Add Patient
          </button>
          <button
            type='button'
            onClick={() => setShowForm(false)}
            className='bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded-lg transition'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPatientForm
