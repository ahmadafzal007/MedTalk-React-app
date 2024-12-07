import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UnprocessedImages = ({ folderName, onClose }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [processedData, setProcessedData] = useState({
    normal: [],
    tb: [],
    pneumonia: [],
    covid: [],
  });

  // Get folder path logic
  const getFolderPath = (folderName = 'Chest') => {
    if (folderName === 'Chest') {
      return 'chest_xray';
    } else if (folderName === 'Kidney') {
      return 'kidney_scan';
    }
    return folderName;
  };

  // Fetch images from the server
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const folderPath = getFolderPath(folderName);

        // Log the folderPath for debugging
        console.log('Folder Path: ', folderPath);

        // Check if folderPath is valid
        if (!folderPath) {
          console.error('Folder path is undefined!');
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/folder`);
        console.log('Response: ', response);
        const imageFiles = response.data.Chest || []; // Assuming the API returns { files: [...] }
        console.log('Image Files: ', imageFiles);

        setImages(imageFiles);
        if (imageFiles.length > 0) {
          setCurrentImage(imageFiles[0]);
        }
      } catch (error) {
        console.error('Error fetching images: ', error);
      }
    };

    fetchImages();
  }, [folderName]);

  // Handle the previous image
  const handlePreviousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setCurrentImage(images[(currentIndex - 1 + images.length) % images.length]);
  };

  // Handle the next image
  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setCurrentImage(images[(currentIndex + 1) % images.length]);
  };

  // Simulate moving the image to a labeled folder
  const handleLabelImage = (label) => {
    const newProcessedData = { ...processedData };
    newProcessedData[label].push(currentImage);

    // Simulate moving the image by changing its path (directory)
    const updatedImagePath = `/processedChestData/${label}/${currentImage}`;

    // Update the processed data and image path
    setProcessedData(newProcessedData);

    // After labeling, move to the next image
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setCurrentImage(images[(currentIndex + 1) % images.length]);

    console.log(`Image ${currentImage} moved to ${updatedImagePath}`);
  };

  return (
    <div className=" inset-0 bg-black bg-opacity-70 p-8 overflow-y-auto backdrop-blur-sm">
      <button onClick={onClose} className="text-white mb-4 transition-all hover:scale-105">
        &#8592; Back
      </button>
      <h3 className="text-2xl font-medium text-white mb-6 animate__animated animate__fadeIn">{folderName} Images:</h3>
      <div className="flex flex-col items-center">
        {currentImage && (
          <div className="bg-[#151518] p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <p className="text-white mb-4 text-center">{currentImage}</p>
            <img
              src={`/datasets/${getFolderPath(folderName)}/${currentImage}`}
              alt={currentImage}
              className="w-full h-64 object-cover rounded-lg transition-transform transform hover:scale-105"
            />
            <div className="flex space-x-4 mt-4">
              <button onClick={handlePreviousImage} className="btn btn-primary">
                Previous
              </button>
              <button onClick={handleNextImage} className="btn btn-primary">
                Next
              </button>
            </div>
            <div className="flex space-x-4 mt-4">
              <button onClick={() => handleLabelImage('normal')} className="btn btn-success">
                Normal
              </button>
              <button onClick={() => handleLabelImage('tb')} className="btn btn-danger">
                TB
              </button>
              <button onClick={() => handleLabelImage('pneumonia')} className="btn btn-warning">
                Pneumonia
              </button>
              <button onClick={() => handleLabelImage('covid')} className="btn btn-info">
                COVID
              </button>
            </div>
          </div>
        )}
      </div>
      {/* For testing purposes, display the processed data */}
      <div className="mt-8">
        <h2 className="text-lg text-white">Processed Data:</h2>
        <pre className="text-white">{JSON.stringify(processedData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default UnprocessedImages;
