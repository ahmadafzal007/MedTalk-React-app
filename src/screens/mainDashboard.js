import React, { useState } from 'react';

const DoctorDashboard = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [diagnosisResult, setDiagnosisResult] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Simulate a diagnosis process
            setDiagnosisResult('Diagnosis result: Normal');
            // Implement actual file upload and diagnosis logic here
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center py-10">
            <h1 className="text-3xl mb-8">Doctor Dashboard</h1>
            <div className="w-full max-w-2xl">
                <div className="bg-gray-900 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl mb-4">Upload Chest X-ray</h2>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                        className="mb-4 p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg w-full"
                    />
                    <button
                        onClick={handleUpload}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
                    >
                        Upload and Diagnose
                    </button>
                </div>
                {diagnosisResult && (
                    <div className="bg-gray-900 p-6 rounded-lg shadow-md mt-4">
                        <h2 className="text-2xl mb-4">Diagnosis Result</h2>
                        <p>{diagnosisResult}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;
