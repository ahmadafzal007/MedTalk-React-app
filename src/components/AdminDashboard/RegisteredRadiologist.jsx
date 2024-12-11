import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Import loader

const RegisteredRadiologists = () => {
  const [radiologists, setRadiologists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust the number of items per page
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch all Radiologists
  useEffect(() => {
    const fetchRadiologists = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get('http://localhost:3000/api/radiologists');
        setRadiologists(response.data); // All radiologists data
        setTotalItems(response.data.length); // Set total items for pagination
      } catch (error) {
        console.error('Error fetching radiologists:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchRadiologists();
  }, []);

  // Paginate the data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRadiologists = radiologists.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle page change
  const handlePagination = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-full font-poppins mx-auto p-8 text-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        R<span className="font-normal">egistered</span> R<span className="font-normal">adiologists</span>
      </h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#68687f" size={50} /> {/* Loader during data fetching */}
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {currentRadiologists.map((radiologist) => (
              <div
                key={radiologist._id}
                className="bg-[#151518] border border-gray-700 p-4 rounded-md"
              >
                <h3 className="text-sm underline font-medium mb-2 text-white">
                  {radiologist.name}
                </h3>
                <div className="flex text-xs justify-between text-gray-300">
                  <p>
                    <span className="font-medium text-white">Email:</span> {radiologist.email}
                  </p>
                  <p>
                    <span className="font-medium text-white">Phone:</span> {radiologist.phoneNumber}
                  </p>
                  <p>
                    <span className="font-medium text-white">Role:</span> {radiologist.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 mx-2 bg-[#151518] border border-gray-700 text-white rounded-md hover:bg-gray-600"
              onClick={() => handlePagination(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <span className="text-white text-xs mt-3">
              {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 mx-2 bg-[#1a1a1a] border border-gray-700 text-white rounded-md hover:bg-gray-600"
              onClick={() => handlePagination(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisteredRadiologists;
