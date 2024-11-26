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
    setHospitals(hospitals.filter(hospital => hospital.id !== id)); // Remove the hospital from the list
  };

  return (
    <div className='p-8'>
      <h2 className='text-2xl font-bold mb-6 text-white'>
        Unauthorized Hospitals
      </h2>
      <div className='space-y-6'>
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className='bg-[#1a1a1a] p-6 rounded-lg shadow-lg text-white w-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl'
            >
              <h3 className='text-lg font-bold mb-2'>{hospital.hospitalName}</h3>
              <p className='text-gray-400'>Address: {hospital.address}</p>
              <p className='text-gray-400'>Phone: {hospital.phone}</p>
              <p className='text-gray-400'>Email: {hospital.email}</p>

              <div className='mt-4'>
                <button
                  onClick={() => handleApproval(hospital.id, true)}
                  className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg mr-2'
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(hospital.id, false)}
                  className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg'
                >
                  Decline
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-200'>No unauthorized hospitals at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default UnauthorizedHospitals;
