import React, { useState, useEffect } from 'react';
import HospitalControllers from '../../API/hospital';

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
        Authorized H<span className="font-normal">ospitals</span>
      </h2>
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : hospitals.length > 0 ? ( // Check if hospitals array is not empty
        <div className="space-y-6">
          {hospitals.map((hospital) => (
            <div
              key={hospital._id}
              className="bg-[#1a1a1a] border border-gray-700 p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-lg font-bold mb-2 text-white">
                {hospital.user.name} {/* Access nested user name */}
              </h3>
              <div className="space-y-2 text-xs text-gray-300">
                <p>
                  <span className="font-medium text-white">Address:</span> {hospital.address}
                </p>
                <p>
                  <span className="font-medium text-white">Phone:</span> {hospital.phoneNumber}
                </p>
                <p>
                  <span className="font-medium text-white">Website:</span> {hospital.websiteURL}
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
