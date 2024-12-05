import React, { useState } from 'react';

const UnauthorizedHospitals = () => {
  // Dummy data for unauthorized hospitals
  const [hospitals, setHospitals] = useState([
    { id: 1, hospitalName: 'City Hospital', address: '123 Main St', phone: '123-456-7890', email: 'cityhospital@example.com' },
    { id: 2, hospitalName: 'Green Valley Medical', address: '456 Elm St', phone: '987-654-3210', email: 'greenvalley@example.com' },
    { id: 3, hospitalName: 'Lakeside Clinic', address: '789 Lake Ave', phone: '555-555-5555', email: 'lakeside@example.com' },
  ]);

  // Function to handle approve and decline actions
  const handleApproval = (id, isApproved) => {
    if (isApproved) {
      alert(`Hospital with ID ${id} has been approved.`);
    } else {
      alert(`Hospital with ID ${id} has been declined.`);
    }
    setHospitals(hospitals.filter((hospital) => hospital.id !== id)); // Remove the hospital from the list
  };

  return (
    <div className="max-w-full  font-poppins mx-auto p-8 text-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        U<span className="font-normal">nauthorized</span> H<span className="font-normal">ospitals</span>
      </h2>
      <div className="space-y-6">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-[#1a1a1a] border border-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-lg font-bold mb-2 text-white">{hospital.hospitalName}</h3>
              <div className="space-y-2 text-xs text-gray-300">
                <p>
                  <span className="font-medium text-white">Address:</span> {hospital.address}
                </p>
                <p>
                  <span className="font-medium text-white">Phone:</span> {hospital.phone}
                </p>
                <p>
                  <span className="font-medium text-white">Email:</span> {hospital.email}
                </p>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleApproval(hospital.id, true)}
                  className="bg-[#151518] border border-gray-700 hover:border-green-500 text-white text-xs px-4 py-2 rounded-lg shadow-md transition ease-in-out"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(hospital.id, false)}
                  className="bg-[#151518] border border-gray-700 hover:border-red-500 text-white text-xs px-4 py-2 rounded-lg shadow-md transition ease-in-out"
                >
                  Decline
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-300">No unauthorized hospitals at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnauthorizedHospitals;
