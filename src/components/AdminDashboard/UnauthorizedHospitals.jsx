import React, { useState, useEffect } from 'react';
import AdminControllers from '../../API/admin'; // Ensure this path is correct

const UnauthorizedHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch unauthorized hospitals on component mount
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await AdminControllers.viewUnauthorizedHospitals();

        // Assuming `unauthorizedHospitals` is the key containing the hospitals list
        if (data && Array.isArray(data.unauthorizedHospitals)) {
          setHospitals(data.unauthorizedHospitals);
        } else {
          console.error('Unexpected data format:', data);
          setError('Failed to load hospitals. Please contact support.');
        }
      } catch (err) {
        console.error('Error fetching hospitals:', err);
        setError('Failed to fetch hospitals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // Handle approval action
  const handleApproval = async (hospitalId) => {
    try {
      const response = await AdminControllers.authorizeHospital(hospitalId);
      alert(`Hospital has been approved.`);
      // Update state to remove the approved hospital
      setHospitals(hospitals.filter((hospital) => hospital._id !== hospitalId));
    } catch (err) {
      console.error('Error authorizing hospital:', err);
      alert('Failed to approve hospital. Please try again.');
    }
  };

  return (
    <div className="max-w-full font-poppins mx-auto p-8 text-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        U<span className="font-normal">nauthorized</span> H<span className="font-normal">ospitals</span>
      </h2>
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : hospitals.length > 0 ? (
        <div className="space-y-6">
          {hospitals.map((hospital) => (
            <div
              key={hospital._id}
              className="bg-[#1a1a1a] border border-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-lg font-bold mb-2 text-white">
                {hospital.user ? hospital.user.name : 'No Name Available'}
              </h3>
              <div className="space-y-2 text-xs text-gray-300">
                <p>
                  <span className="font-medium text-white">Phone:</span> {hospital.phoneNumber || 'N/A'}
                </p>
                <p>
                  <span className="font-medium text-white">License Number:</span>{' '}
                  {hospital.registrationLicenseNumber || 'N/A'}
                </p>
                <p>
                  <span className="font-medium text-white">Type:</span> {hospital.hospitalType || 'N/A'}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleApproval(hospital._id)}
                  className="bg-[#151518] border border-gray-700 hover:border-green-500 text-white text-xs px-4 py-2 rounded-lg shadow-md transition ease-in-out"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg text-center">
          <p className="text-gray-300">No unauthorized hospitals at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default UnauthorizedHospitals;
