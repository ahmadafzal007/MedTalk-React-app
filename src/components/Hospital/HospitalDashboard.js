import React, { useState, useEffect } from 'react';
import HospitalController from '../../API/hospital'
// const doctorsData = [
//     { id: 1, name: "Dr. John Doe", email: "john@example.com" },
//     { id: 2, name: "Dr. Jane Smith", email: "jane@example.com" },
//     { id: 3, name: "Dr. Jim Brown", email: "jim@example.com" },
//     { id: 4, name: "Dr. Jake White", email: "jake@example.com" },
//     { id: 5, name: "Dr. Jill Green", email: "jill@example.com" },
//     { id: 6, name: "Dr. Judy Blue", email: "judy@example.com" },
//     { id: 7, name: "Dr. Jack Black", email: "jack@example.com" },
//     { id: 8, name: "Dr. Jasmine Yellow", email: "jasmine@example.com" },
//     { id: 9, name: "Dr. Jerry Pink", email: "jerry@example.com" },
//     { id: 10, name: "Dr. Janet Purple", email: "janet@example.com" }
// ];

const AdminDashboard = () => {
    const [doctorsData, setDoctorsData] = useState([]);

    useEffect(() => {
        (async () => {
            // Get all hospitals
            const token = localStorage.getItem('token');

            const pendingProfessionalsResponse = await HospitalController.getPendingProfessionals( token);
            if (pendingProfessionalsResponse.success) {
              console.log("Pending Professionals:", pendingProfessionalsResponse.data.users);
              const doctors = pendingProfessionalsResponse.data.users.map((item)=>{
                return {
                    id : item.healthCareCenterId,
                    name: item.user.name,
                    email: item.user.email,
                }
              })
              setDoctorsData(doctors)
              console.log("doctor" , doctorsData)
            } else {
              console.error("Error fetching pending professionals:", pendingProfessionalsResponse.error);
            }
          })();
    }, []);

    const handleAccept = (id) => {
        console.log(`Doctor with id ${id} accepted`);
        // Implement accept logic here
    };

    const handleReject = (id) => {
        console.log(`Doctor with id ${id} rejected`);
        // Implement reject logic here
    };

    return (
        <div className="min-h-screen font-sans md:font-serif bg-black text-white flex flex-col items-center py-10">
            <h1 className="text-3xl mb-8 font-sans md:font-serif ">Hospital Admin Dashboard</h1>
            <div className="w-full max-w-4xl">
                <table className="min-w-full bg-gray-900 text-gray-200">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="py-2 px-4">Hospital</th>
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctorsData.map(doctor => (
                            <tr key={doctor.id} className="border-b border-gray-700">
                                <td className="py-2 px-4">{doctor.id}</td>
                                <td className="py-2 px-4">{doctor.name}</td>
                                <td className="py-2 px-4">{doctor.email}</td>
                                <td className="py-2 px-4 flex gap-4">
                                    <button
                                        onClick={() => handleAccept(doctor.id)}
                                        className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(doctor.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                                    >
                                        Reject
                                    </button>
                                </td>   
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
