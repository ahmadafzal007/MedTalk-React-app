import React, { useState, useEffect } from 'react';
import HospitalControllers from '../../API/hospital';
import { ClipLoader } from 'react-spinners'; // Import a loader component

const AuthorizedHospitals = () => {
  const [hospitals, setHospitals] = useState([]); // Ensure this is an array
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch authorized hospitals
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await HospitalControllers.viewAuthorizedHospitals();

        // Extract hospitals from the response
        if (data && Array.isArray(data.authorizedHospitals)) {
          setHospitals(data.authorizedHospitals);
        } else {
          console.error('Unexpected data format:', data);
          setError('Failed to load hospitals. Please contact support.');
        }
      } catch (err) {
        setError('Failed to fetch hospitals. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="max-w-full font-poppins mx-auto p-8 text-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        A<span className="font-normal">uthorized</span> H<span className="font-normal">ospitals</span>
      </h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="#68687f" size={50} /> {/* Spinner while loading */}
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : hospitals.length > 0 ? ( // Check if hospitals array is not empty
        <div className="space-y-6">
          {hospitals.map((hospital) => (
            <div
              key={hospital._id}
              className="bg-[#151518] border border-gray-700 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-sm font-medium mb-2 text-white">
                {hospital.user.name} {/* Access nested user name */}
              </h3>
              <div className="space-y-2 flex justify-between text-xs text-gray-300">
                <p>
                  <span className="font-medium text-white">Address:</span> {hospital.address}
                </p>
                <p>
                  <span className="font-medium text-white">Phone:</span> {hospital.phoneNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">No hospitals found.</div>
      )}
    </div>
  );
};

export default AuthorizedHospitals;
