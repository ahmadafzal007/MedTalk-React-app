import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component for viewing images within a selected folder
const FolderView = ({ folderName, images, onClose }) => {
  const getFolderPath = (folderName) => {
    if (folderName === 'Chest') {
      return 'chest_xray';
    } else if (folderName === 'Kidney') {
      return 'kidney_scan';
    }
    return folderName;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 p-8 overflow-y-auto backdrop-blur-sm">
      <button onClick={onClose} className="text-white mb-4 transition-all  hover:scale-105">
        &#8592; Back
      </button>
      <h3 className="text-2xl font-medium text-white mb-6 animate__animated animate__fadeIn">{folderName} Images:</h3>
      <div className="grid grid-cols-2 text-xs sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => {
          const folderPath = getFolderPath(folderName);
          const imagePath = `/datasets/${folderPath}/${image}`;
          return (
            <div key={index} className="bg-[#151518] p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
              <p className="text-white mb-4 text-center">{image}</p>
              <img
                src={imagePath}
                alt={image}
                className="w-full h-32 object-cover rounded-lg transition-transform transform hover:scale-105"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const UnprocessedDatasets = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [datasetType, setDatasetType] = useState();
  const [folders, setFolders] = useState({});
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleDatasetTypeChange = (e) => setDatasetType(e.target.value);

  const handleFileUpload = async () => {
    if (!selectedFile || !datasetType) {
      alert('Please select a dataset type and upload a ZIP file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('datasetType', datasetType);

    try {
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.message) {
        alert(response.data.message);
      }
      fetchFolders(); 
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
      alert(`Failed to upload the file. Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  const fetchFolders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/folder');
      setFolders(response.data);
    } catch (error) {
      console.error('Error fetching folders:', error.response ? error.response.data : error.message);
      alert('Failed to fetch folder data.');
    }
  };

  return (
    <div className="p-10 bg-gradient-to-br  to-black min-h-screen max-h-screen overflow-hidden relative text-white">
      <h2 className="text-4xl font-bold mb-8 text-center text-white animate__animated animate__fadeIn">U<span className='font-normal'>nprocessed</span> D<span className='font-normal'>atasets</span></h2>

      <div className="mb-8 ">
        <label className="text-sm  font-medium">Select Dataset Type:</label>
        <select
          value={datasetType}
          onChange={handleDatasetTypeChange}
          className="text-white text-xs mt-2 bg-[#151518] border border-gray-700 p-3 rounded-lg w-full transition-all hover:bg-[#313138]"
        >
          <option value="">Select</option>
          <option value="Chest">Chest</option>
          <option value="Kidney">Kidney</option>
        </select>
      </div>

      <div className="mb-8">
        <input
          type="file"
          accept=".zip"
          onChange={handleFileChange}
          className="text-white text-xs bg-[#151518] border border-gray-700 p-3 rounded-lg w-full transition-all hover:bg-[#313138]"
        />
        <button
          onClick={handleFileUpload}
          className="bg-[#151518] boder text-xs mt-8 border-gray-700 hover:bg-[#313138] text-white px-6 py-3 rounded-lg  transition-all hover:scale-105"
        >
          Upload ZIP
        </button>
      </div>

      {Object.keys(folders).length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-6 text-center">F<span className='font-normal'>olders:</span></h3>
          <div className="grid grid-cols-2 text-xs sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.keys(folders).map((folderName, index) => (
              <button
                onClick={() => setSelectedFolder(folderName)}
                key={index}
                className="bg-[#151518] border border-gray-700 hover:bg-[#313138] p-6 rounded-lg flex justify-between items-center transform transition-all hover:scale-105 hover:shadow-lg"
              >
                <p
                  className="text-white cursor-pointer text-center "
                >
                  {folderName}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedFolder && (
        <FolderView
          folderName={selectedFolder}
          images={folders[selectedFolder]}
          onClose={() => setSelectedFolder(null)}
        />
      )}
    </div>
  );
};

export default UnprocessedDatasets;
