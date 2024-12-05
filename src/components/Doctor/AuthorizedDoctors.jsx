import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';
import HospitalControllers from '../../API/hospital'; // Update the import path

const AuthorizedDoctors = ({ onSelectDoctor }) => {
  const [doctorsData, setDoctorsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await HospitalControllers.viewAuthorizedDoctors();

        // Handle the response format where authorizedDoctors is the key
        if (data && Array.isArray(data.authorizedDoctors)) {
          setDoctorsData(data.authorizedDoctors); // Access authorizedDoctors property
        } else {
          setDoctorsData([]); // Fallback if structure is unexpected
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching authorized doctors:', error);
        setDoctorsData([]); // Fallback in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on search query
  const filteredDoctors = Array.isArray(doctorsData)
    ? doctorsData.filter((doctor) =>
        doctor.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Pagination logic
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const endIndex = startIndex + doctorsPerPage;
  const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  // Handlers
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className='p-6 min-h-screen'>
      <h2 className='text-2xl font-bold text-center text-gray-200 mb-4'>
        Authorized Doctors
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
            <p className='bg-[#151518] text-center'>No doctors found.</p>
          ) : (
            <ul className='space-y-2'>
              {paginatedDoctors.map((doctor) => (
                <li
                  key={doctor.user.email}
                  onClick={() => onSelectDoctor(doctor)} // Added onClick handler here
                  className='bg-[#151518] border border-gray-700 py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer' 
                >
                  <div className='flex items-center'>
                    <img
                      src={doctor.user.profileImage || 'default-profile.png'}
                      alt={doctor.user.name}
                      className='w-12 h-12 object-contain bg-black rounded-full border-2 border-gray-200 mr-4'
                    />
                    <div>
                      <p className='text-md font-semibold text-gray-100'>
                        {doctor.user.name}
                      </p>
                      <p className='text-gray-400 text-sm'>{doctor.user.email}</p>
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
                  className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-[#151518] border border-white text-white' : 'bg-gray-800 text-gray-400'} hover:bg-teal-600`}
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

AuthorizedDoctors.propTypes = {
  onSelectDoctor: PropTypes.func.isRequired,
};

export default AuthorizedDoctors;
