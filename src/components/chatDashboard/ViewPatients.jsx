import { useState, useEffect } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import ChatController from '../../API/doctor'; // Import your API service to fetch data

const ViewPatients = () => {
  const navigate = useNavigate();

  // Patients state
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to show while fetching
  const [error, setError] = useState(null); // Error state to handle errors

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 6;

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch patients from backend when component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await ChatController.getAllPatients(); // Fetch patients from backend
        console.log("fetching patients: ",response)
        setPatients(response.patients); // Assuming 'response.patients' contains the patient data
        setLoading(false); // Set loading to false after fetching
      } catch (err) {
        setError(err.message || 'Failed to fetch patients');
        setLoading(false); // Stop loading if error occurs
      }
    };

    fetchPatients(); // Call the function when component mounts
  }, []);

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;

  // Filter patients by CNIC based on search term
  const filteredPatients = patients.filter((patient) =>
    patient.cnic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Current patients to display based on pagination
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle chat icon click
  const handleChatClick = (patientId) => {
    navigate(`/chat/${patientId}`);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading patients...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className='w-full max-w-screen-lg mx-auto border border-gray-700 font-poppins p-8 bg-[#151518] text-gray-200 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-6 text-white text-center'>
        P<span className='font-normal'>atient</span> L<span className='font-normal'>ist</span>
      </h2>

      {/* Search Bar */}
      <div className='mb-6 flex justify-end'>
        <input
          type='text'
          placeholder='Search by CNIC'
          className='w-[300px] border border-gray-700 hover:border-white text-sm p-3 text-white rounded'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {currentPatients.length > 0 ? (
        <div className='overflow-auto max-h-96'> {/* Fixed height for scrollable table */}
          <table className='min-w-full border border-gray-700 rounded-lg'>
            <thead>
              <tr className='text-left text-sm'>
                <th className='py-3 px-6 text-white border-b border-gray-700'>Name</th>
                <th className='py-3 px-6 text-white border-b border-gray-700'>Age</th>
                <th className='py-3 px-6 text-white border-b border-gray-700'>CNIC</th>
                <th className='py-3 px-6 text-white border-b border-gray-700'>Chat</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient, index) => (
                <tr key={index} className='border-t text-xs border-gray-600 hover:bg-gray-700'>
                  <td className='py-3 px-6'>{patient.name}</td>
                  <td className='py-3 px-6'>{patient.age}</td>
                  <td className='py-3 px-6'>{patient.cnic}</td>
                  <td className='py-3 px-6'>
                    <button onClick={() => handleChatClick(patient._id)} className='text-white hover:text-gray-300'>
                      <AiOutlineMessage size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className='text-gray-500 text-xs text-center'>No patients found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center mt-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 mx-1 border border-white text-sm rounded ${currentPage === 1 ? 'bg-gray-700' : 'bg-[#151518]'}`}
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              onClick={() => handlePageChange(num + 1)}
              className={`px-3 py-1 mx-1 border text-sm border-white rounded ${currentPage === num + 1 ? 'bg-gray-700' : 'bg-[#151518]'}`}
            >
              {num + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border border-white text-sm mx-1 rounded ${currentPage === totalPages ? 'bg-gray-700' : 'bg-[#151518]'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewPatients;
