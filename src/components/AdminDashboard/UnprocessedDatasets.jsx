import React, { useState } from 'react';
import JSZip from 'jszip';

// Component for viewing images within a selected folder
const FolderView = ({ folderName, images, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-90 p-8 overflow-y-auto">
    <button onClick={onClose} className="text-white text-xl mb-4">&#8592; Back</button>
    <h3 className="text-2xl font-bold text-white mb-4">{folderName} Images:</h3>
    <div className="grid grid-cols-2 gap-4">
      {images.map((image, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg">
          <p className="text-white mb-2">{image.name}</p>
          <img src={image.url} alt={image.name} className="w-full h-32 object-cover rounded-lg" />
        </div>
      ))}
    </div>
  </div>
);

const UnprocessedDatasets = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [folders, setFolders] = useState({});
  const [datasetType, setDatasetType] = useState('');
  const [selectedRadiologist, setSelectedRadiologist] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [sharingFolder, setSharingFolder] = useState(null);

  const radiologists = [
    { id: 1, radiologistName: 'Dr. Alice Johnson' },
    { id: 2, radiologistName: 'Dr. Bob Smith' },
    { id: 3, radiologistName: 'Dr. Clara Lee' },
  ];

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);
  const handleDatasetTypeChange = (e) => setDatasetType(e.target.value);

  const handleFileUpload = async () => {
    if (!selectedFile || !datasetType) {
      alert('Please select a dataset type and upload a ZIP file.');
      return;
    }

    const zip = new JSZip();
    const extractedImages = [];
    try {
      const content = await zip.loadAsync(selectedFile);
      for (const fileName in content.files) {
        const file = content.files[fileName];
        if (!file.dir && /\.(png|jpe?g|gif)$/i.test(file.name)) {
          const imageBlob = await file.async('blob');
          const imageUrl = URL.createObjectURL(imageBlob);
          extractedImages.push({ name: file.name, url: imageUrl });
        }
      }

      if (extractedImages.length > 0) {
        const folderCount = Object.keys(folders).filter(folder => folder.startsWith(datasetType)).length + 1;
        const newFolderName = `${datasetType}-set${folderCount}`;

        setFolders(prevFolders => ({
          ...prevFolders,
          [newFolderName]: extractedImages,
        }));
        alert(`Images extracted and organized into folder: ${newFolderName}`);
      } else {
        alert('No images found in the zip file.');
      }
    } catch (error) {
      console.error('Error extracting files:', error);
      alert('Failed to extract the zip file.');
    }
  };

  const handleShareWithRadiologist = () => {
    if (!selectedRadiologist || !sharingFolder) {
      alert('Please select a radiologist and ensure a folder is selected for sharing.');
      return;
    }

    console.log('Selected radiologistId:', selectedRadiologist);
    console.log('Sharing Folder:', sharingFolder);
    console.log('Images to be shared:', folders[sharingFolder]);

    alert(`Folder ${sharingFolder} shared with ${radiologists.find(r => r.id === Number(selectedRadiologist)).radiologistName} successfully!`);
  };

  return (
    <div className="p-8 bg-black min-h-screen max-h-screen overflow-hidden relative">
      <h2 className="text-2xl font-bold mb-6 text-white">Unprocessed Datasets</h2>

      {/* Dataset Type Selection */}
      <div className="mb-6">
        <label className="text-white block mb-2">Select Dataset Type:</label>
        <select
          value={datasetType}
          onChange={handleDatasetTypeChange}
          className="text-white bg-gray-700 border border-gray-600 p-2 rounded-lg w-full"
        >
          <option value="">Select</option>
          <option value="Chest">Chest</option>
          <option value="Kidney">Kidney</option>
        </select>
      </div>

      {/* File Upload Section */}
      <div className="mb-6">
        <input
          type="file"
          accept=".zip"
          onChange={handleFileChange}
          className="text-white bg-gray-700 p-2 rounded-lg w-full"
        />
        <button
          onClick={handleFileUpload}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
        >
          Upload ZIP
        </button>
      </div>

      {/* Display Folders with Share Options */}
      {Object.keys(folders).length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Folders:</h3>
          <div className="grid grid-cols-2 gap-4 overflow-hidden">
            {Object.keys(folders).map((folderName, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              >
                <p
                  onClick={() => setSelectedFolder(folderName)}
                  className="text-white cursor-pointer hover:underline"
                >
                  {folderName}
                </p>
                <button
                  onClick={() => setSharingFolder(folderName)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                >
                  Share
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share with Radiologist Section */}
      {sharingFolder && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-white">
            Share Folder {sharingFolder} with Radiologist:
          </h3>
          <select
            onChange={(e) => setSelectedRadiologist(e.target.value)}
            className="text-white bg-gray-700 border border-gray-600 p-2 rounded-lg w-full"
          >
            <option value="">Select Radiologist</option>
            {radiologists.map((radiologist) => (
              <option key={radiologist.id} value={radiologist.id}>
                {radiologist.radiologistName}
              </option>
            ))}
          </select>

          {/* Share Button */}
          <button
            onClick={handleShareWithRadiologist}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-4"
          >
            Share
          </button>
        </div>
      )}

      {/* Folder View Modal */}
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
