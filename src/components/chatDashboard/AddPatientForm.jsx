import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPatient } from '../../redux/patientSLice'; // Import addPatient action
import { FaMinus, FaPlus } from 'react-icons/fa'; // Icons for increment and decrement
import './chat.css';

const AddPatientForm = ({ setShowForm }) => {
  const [firstName, setFirstName] = useState(''); // State for first name
  const [lastName, setLastName] = useState(''); // State for last name
  const [age, setAge] = useState(0); // Initialize age as 0
  const [cnic, setCnic] = useState(''); // State for CNIC

  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patientList); // Get patient list from Redux

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullName = `${firstName} ${lastName}`; // Combine first and last name
    const newPatient = { name: fullName, age, cnic };

    dispatch(addPatient(newPatient)); // Dispatch add patient action
    // Reset input fields after submission
    setFirstName('');
    setLastName('');
    setAge(0);
    setCnic('');
  };

  const incrementAge = () => {
    setAge((prevAge) => prevAge + 1);
  };

  const decrementAge = () => {
    if (age > 0) setAge((prevAge) => prevAge - 1); // Ensure age is not negative
  };

  return (
    <div className='max-w-full border border-gray-700 font-poppins mx-auto p-8 bg-[#151518] text-gray-200 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-6 text-white text-center'>
        A<span className='font-normal'>dd</span> N<span className='font-normal'>ew</span> P<span className='font-normal'>atient</span>
      </h2>
      <div className='form-container'> {/* Add this wrapper */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input Fields */}
          <div className='mb-4 flex flex-col md:flex-row md:space-x-4'>
            <div className='flex-1'>
              <label htmlFor='first-name' className='block mb-2 text-xs font-normal text-white'>
                First Name
              </label>
              <input
                type='text'
                id='first-name'
                className='w-full p-4 border mb-4 text-xs border-gray-700 bg-[#151518] text-gray-200 rounded-lg  transition'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter patient's first name"
                required
              />
            </div>
            <div className='flex-1'>
              <label htmlFor='last-name' className='block mb-2 text-xs font-normal text-white'>
                Last Name
              </label>
              <input
                type='text'
                id='last-name'
                className='w-full p-4 border text-xs border-gray-700 bg-[#151518] text-gray-200 rounded-lg transition'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter patient's last name"
                required
              />
            </div>
          </div>

          {/* Age Input with Increment/Decrement */}
          <div className='mb-4 relative'>
            <label htmlFor='age' className='block mb-2 text-xs font-normal text-white'>
              Age
            </label>
            <div className='flex text-xs items-center space-x-4'>
              <button
                type='button'
                onClick={decrementAge}
                className='p-2 bg-[#151518] rounded-lg border border-gray-700 transition'
              >
                <FaMinus className='text-white' />
              </button>
              <input
                type='number'
                id='age'
                className='w-16 p-4 text-center text-xs border border-gray-700 bg-[#151518] text-gray-200 rounded-lg  transition'
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                placeholder="Age"
                min="0"
                required
              />
              <button
                type='button'
                onClick={incrementAge}
                className='p-2 bg-[#151518] border border-gray-700 rounded-lg transition'
              >
                <FaPlus className='text-white' />
              </button>
            </div>
          </div>

          {/* CNIC Input */}
          <div className='mb-4'>
            <label htmlFor='cnic' className='block mb-2 text-xs font-normal text-white'>
              CNIC
            </label>
            <input
              type='text'
              id='cnic'
              className='w-full p-4 border text-xs border-gray-700 bg-[#151518] text-gray-200 rounded-lg  transition'
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              placeholder="Enter patient's CNIC"
              required
            />
          </div>

          {/* Note Card */}
          <div className='bg-[#151518] border border-gray-700 p-4 rounded-lg text-xs'>
            <h3 className='font-semibold text-white'>Note:</h3>
            <p className='text-gray-300'>
              Please be careful while entering the credentials of the patient. 
              Do not share this data with any unauthorized resource to ensure data privacy.
            </p>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className='flex justify-between mt-8'>
            <button
              type='submit'
              className='bg-[#151518] text-xs border border-gray-700 hover:border-white text-white py-2 px-4 mr-40 rounded-lg shadow-md transition ease-in-out'
            >
              Add Patient
            </button>
            <button
              type='button'
              onClick={() => setShowForm(false)}
              className='bg-[#151518] text-xs border border-gray-700 hover:border-white text-white py-2 px-4 rounded-lg shadow-md transition ease-in-out'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;
