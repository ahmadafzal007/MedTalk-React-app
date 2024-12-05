import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import PropTypes from 'prop-types';
import HospitalControllers from '../../API/hospital'; // Import your API controller

const UnauthorizedDoctors = ({ onSelectDoctor }) => {
  const [unauthorizedDoctors, setUnauthorizedDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDoctor, setExpandedDoctor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // For fetching data
  const [actionLoading, setActionLoading] = useState(false); // For approve/reject actions
  const doctorsPerPage = 6;

  // Fetch unauthorized doctors on component mount
  useEffect(() => {
    const fetchUnauthorizedDoctors = async () => {
      try {
        setLoading(true);
        const data = await HospitalControllers.viewUnauthorizedDoctors();
        setUnauthorizedDoctors(data.unauthorizedDoctors || []);
      } catch (error) {
        console.error('Error fetching unauthorized doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnauthorizedDoctors();
  }, []);

  const filteredDoctors = unauthorizedDoctors.filter((doctor) =>
    doctor.user.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleApproveDoctor = async (doctorId) => {
    try {
      setActionLoading(true);
      await HospitalControllers.authorizeDoctor(doctorId);
      setUnauthorizedDoctors((prev) =>
        prev.filter((doctor) => doctor._id !== doctorId)
      );
    } catch (error) {
      console.error('Error approving doctor:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectDoctor = async (doctorId) => {
    try {
      setActionLoading(true);
      await HospitalControllers.deleteDoctor(doctorId);
      setUnauthorizedDoctors((prev) =>
        prev.filter((doctor) => doctor._id !== doctorId)
      );
    } catch (error) {
      console.error('Error rejecting doctor:', error);
    } finally {
      setActionLoading(false);
    }
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
                  key={doctor._id}
                  onClick={() => onSelectDoctor(doctor)}
                  className='bg-[#151518] border border-gray-700 py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer'
                >
                  <div className='flex items-center justify-between'>
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
                    <div className='flex lg:space-x-2 space-x-1'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApproveDoctor(doctor._id);
                        }}
                        disabled={actionLoading}
                        className='flex items-center bg-green-600 hover:bg-green-700 text-white lg:px-3 py-1 rounded-lg transition duration-200 lg:text-base text-xs px-2'
                      >
                        <FaCheckCircle className='mr-1' />
                        {actionLoading ? 'Processing...' : 'Accept'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRejectDoctor(doctor._id);
                        }}
                        disabled={actionLoading}
                        className='flex items-center bg-red-600 hover:bg-red-700 text-white lg:px-3 py-1 rounded-lg transition duration-200 lg:text-base text-xs px-2'
                      >
                        <FaTimesCircle className='mr-1' />
                        {actionLoading ? 'Processing...' : 'Reject'}
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
