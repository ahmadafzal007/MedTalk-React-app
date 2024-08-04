// import React, { useState } from 'react';
// import axios from 'axios';

// const DoctorDashboard = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [diagnosisResult, setDiagnosisResult] = useState('');
//     const [error, setError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const handleUpload = async () => {
//         if (selectedFile) {
//             const formData = new FormData();
//             formData.append('image', selectedFile);

//             setIsLoading(true);

//             try {
//                 const response = await axios.post('http://localhost:5000/predict_disease', formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 });
//                 setDiagnosisResult(response.data.covid + ', ' + response.data.pneumonia);
//                 setError('');
//             } catch (error) {
//                 setError(error.response?.data?.error || 'An error occurred during the diagnosis.');
//                 setDiagnosisResult('');
//             } finally {
//                 setIsLoading(false);
//             }
//         } else {
//             setError('Please select a file to upload.');
//             setDiagnosisResult('');
//         }
//     };

//     return (
//         <div className="min-h-screen font-sans md:font-serif bg-black text-white flex flex-col items-center py-10">
//             <style jsx>{`
//                 .loader {
//                     border-top-color: #3498db;
//                     -webkit-animation: spin 1s linear infinite;
//                     animation: spin 1s linear infinite;
//                     border: 8px solid rgba(255, 255, 255, 0.3);
//                     border-radius: 50%;
//                     width: 48px;
//                     height: 48px;
//                     margin: auto;
//                 }

//                 @-webkit-keyframes spin {
//                     0% { -webkit-transform: rotate(0deg); }
//                     100% { -webkit-transform: rotate(360deg); }
//                 }

//                 @keyframes spin {
//                     0% { transform: rotate(0deg); }
//                     100% { transform: rotate(360deg); }
//                 }
//             `}</style>
//             <h1 className="text-3xl mb-8">Doctor Dashboard</h1>
//             <div className="w-full max-w-2xl">
//                 <div className="bg-gray-900 p-6 rounded-lg shadow-md">
//                     <h2 className="text-2xl mb-4">Upload Chest X-ray</h2>
//                     <input
//                         type="file"
//                         accept="image/png, image/jpeg"
//                         onChange={handleFileChange}
//                         className="mb-4 p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg w-full"
//                     />
//                     {isLoading ? (
//                         <div className="flex justify-center">
//                             <div className="loader"></div>
//                         </div>
//                     ) : (
//                         <button
//                             onClick={handleUpload}
//                             className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
//                         >
//                              Diagnose
//                         </button>
//                     )}
//                 </div>
//                 {diagnosisResult && (
//                     <div className="bg-gray-900 p-6 rounded-lg shadow-md mt-4">
//                         <h2 className="text-2xl mb-4">Diagnosis Result</h2>
//                         <p>Covid Result || Pneumonia Result</p>
//                         <p>{diagnosisResult}</p>
//                     </div>
//                 )}
//                 {error && (
//                     <div className="bg-red-900 p-6 rounded-lg shadow-md mt-4">
//                         <h2 className="text-2xl mb-4">Error</h2>
//                         <p>{error}</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default DoctorDashboard;





import React, { useState } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [diagnosisResult, setDiagnosisResult] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);

            setIsLoading(true);

            try {
                const response = await axios.post('http://localhost:5000/predict_disease', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const resultText = `Covid result: ${response.data.covid}. Pneumonia result: ${response.data.pneumonia}.`;
                setDiagnosisResult(resultText);
                setError('');
                speakResult(resultText);
            } catch (error) {
                setError(error.response?.data?.error || 'An error occurred during the diagnosis.');
                setDiagnosisResult('');
            } finally {
                setIsLoading(false);
            }
        } else {
            setError('Please select a file to upload.');
            setDiagnosisResult('');
        }
    };

    const speakResult = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
    };

    return (
        <div className="min-h-screen font-sans md:font-serif bg-black text-white flex flex-col items-center py-10">
            <style jsx>{`
                .loader {
                    border-top-color: #3498db;
                    -webkit-animation: spin 1s linear infinite;
                    animation: spin 1s linear infinite;
                    border: 8px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    width: 48px;
                    height: 48px;
                    margin: auto;
                }

                @-webkit-keyframes spin {
                    0% { -webkit-transform: rotate(0deg); }
                    100% { -webkit-transform: rotate(360deg); }
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
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
                    {isLoading ? (
                        <div className="flex justify-center">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <button
                            onClick={handleUpload}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
                        >
                            Diagnose
                        </button>
                    )}
                </div>
                {diagnosisResult && (
                    <div className="bg-gray-900 p-6 rounded-lg shadow-md mt-4">
                        <h2 className="text-2xl mb-4">Diagnosis Result</h2>
                        
                        <p>{diagnosisResult}</p>
                    </div>
                )}
                {error && (
                    <div className="bg-red-900 p-6 rounded-lg shadow-md mt-4">
                        <h2 className="text-2xl mb-4">Error</h2>
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;
