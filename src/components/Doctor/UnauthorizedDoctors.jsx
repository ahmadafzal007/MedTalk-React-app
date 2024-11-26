import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import PropTypes from 'prop-types';

const UnauthorizedDoctors = ({ onSelectDoctor }) => {
  const unauthorizedDoctors = [
      { email: 'doctor1@example.com', name: 'Dr. John Smith', profilePicture: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg', specialization: 'Cardiology', hospital: 'City Hospital' },
      { email: 'doctor2@example.com', name: 'Dr. Jane Doe', profilePicture: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg', specialization: 'Neurology', hospital: 'Green Valley Clinic' },
      { email: 'doctor3@example.com', name: 'Dr. Mike Johnson', profilePicture: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg', specialization: 'Orthopedics', hospital: 'Sunrise Hospital' },
      { email: 'doctor4@example.com', name: 'Dr. Emily Clark', profilePicture: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg', specialization: 'Dermatology', hospital: 'Blue Lake Hospital' },
      { email: 'doctor5@example.com', name: 'Dr. Sarah Brown', profilePicture: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg', specialization: 'Pediatrics', hospital: 'City Clinic' },
      { email: 'doctor6@example.com', name: 'Dr. Peter Williams', profilePicture: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg', specialization: 'Oncology', hospital: 'Metro Health' },
      { email: 'doctor7@example.com', name: 'Dr. Anna Lee', profilePicture: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg', specialization: 'Psychiatry', hospital: 'Green Valley Clinic' },
      { email: 'doctor8@example.com', name: 'Dr. Bob Martin', profilePicture: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg', specialization: 'Neurology', hospital: 'City Hospital' },
      { email: 'doctor9@example.com', name: 'Dr. Carla Diaz', profilePicture: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg', specialization: 'Gastroenterology', hospital: 'Blue Lake Hospital' },
      { email: 'doctor10@example.com', name: 'Dr. Eric Green', profilePicture: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg', specialization: 'Cardiology', hospital: 'Sunrise Hospital' },
      { email: 'doctor11@example.com', name: 'Dr. Sophia King', profilePicture: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg', specialization: 'Orthopedics', hospital: 'City Clinic' },
      { email: 'doctor12@example.com', name: 'Dr. William Wright', profilePicture: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg', specialization: 'Oncology', hospital: 'Metro Health' },
  ];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDoctor, setExpandedDoctor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;
  const loading = false;

  const filteredDoctors = unauthorizedDoctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * doctorsPerPage;
  const endIndex = startIndex + doctorsPerPage;
  const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handlePageChange = (page) => setCurrentPage(page);
  const handleToggleProfile = (doctor) => {
    setExpandedDoctor(expandedDoctor === doctor ? null : doctor);
  };

  return (
    <div className='p-6 min-h-screen'>
      <h2 className='text-2xl font-bold text-center text-gray-200 mb-4'>
        Unauthorized Doctors
      </h2>

      <div className="flex justify-end mb-4">
        <input
          type='text'
          placeholder='Search by name'
          value={searchQuery}
          onChange={handleSearchChange}
          className='p-2 w-80 text-xs border border-gray-700 rounded bg-[#151518] text-gray-200 placeholder-gray-500'
        />
      </div>

      {loading ? (
        <div className='flex justify-center'>
          <ClipLoader color='#36d7b7' loading={loading} size={50} />
        </div>
      ) : (
        <>
          {filteredDoctors.length === 0 ? (
            <p className='bg-[#151518] text-center'>No unauthorized doctors found.</p>
          ) : (
            <ul className='space-y-2'>
              {paginatedDoctors.map((doctor) => (
                <li
                  key={doctor.email}
                  onClick={() => onSelectDoctor(doctor)}
                  className='bg-[#151518] border border-gray-700 py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer'
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <img
                        src={doctor.profilePicture || 'default-profile.png'}
                        alt={doctor.name}
                        className='w-12 h-12 object-contain bg-black rounded-full border-2 border-gray-200 mr-4'
                      />
                      <div>
                        <p className='text-md font-semibold text-gray-100'>
                          {doctor.name}
                        </p>
                        <p className='text-gray-400 text-sm'>{doctor.email}</p>
                      </div>
                    </div>
                    <div className='flex lg:space-x-2 space-x-1'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Approved doctor:', doctor);
                        }}
                        className='flex items-center bg-green-600 hover:bg-green-700 text-white lg:px-3 py-1 rounded-lg transition duration-200 lg:text-base text-xs px-2'
                      >
                        <FaCheckCircle className='mr-1' />
                        Accept
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Declined doctor:', doctor.email);
                        }}
                        className='flex items-center bg-red-600 hover:bg-red-700 text-white lg:px-3 py-1 rounded-lg transition duration-200 lg:text-base text-xs px-2'
                      >
                        <FaTimesCircle className='mr-1' />
                        Reject
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          
          {totalPages > 1 && (
            <div className='flex justify-center mt-4 space-x-2'>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1 ? 'bg-[#151518] border border-white text-white' : 'bg-gray-800 text-gray-400'
                  } hover:bg-teal-600`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

UnauthorizedDoctors.propTypes = {
  onSelectDoctor: PropTypes.func.isRequired,
};

export default UnauthorizedDoctors;
