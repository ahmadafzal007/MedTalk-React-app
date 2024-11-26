import React, { useState } from 'react';

const RadiologistPage = ({ selectedFolder }) => {
  const radiologistId = 1; // Hardcoded for now

  // Dummy radiologist data
  const radiologist = {
    id: radiologistId,
    radiologistName: 'Dr. Smith',
    sharedImages: [
      {
        datasetType: 'Chest',
        images: [
          { url: 'https://example.com/image1.jpg', name: 'Image 1' },
          { url: 'https://example.com/image2.jpg', name: 'Image 2' },
          { url: 'https://example.com/image3.jpg', name: 'Image 3' },
        ],
      },
    ],
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track the current image index

  if (!radiologist || radiologist.sharedImages.length === 0) {
    return <p className='text-white'>No datasets shared with this radiologist yet.</p>;
  }

  // Assuming we're showing images from the first dataset for now
  const dataset = radiologist.sharedImages[0];
  const images = dataset.images;

  // Determine datasetType from the shared dataset (Chest or Kidney)
  const datasetType = dataset.datasetType;

  // Handle next image
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle previous image
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Function to move the current image to the selected folder
  const moveToFolder = (classification) => {
    if (!selectedFolder) {
      alert('Please select a folder first.');
      return;
    }
    const currentImage = images[currentImageIndex];
    console.log(
      `Moved ${currentImage.name} to ${selectedFolder} as ${classification}`
    );
    // Logic to handle moving the image to the selected folder
  };

  return (
    <div className='flex-1 p-8 bg-gray-900 min-h-screen flex flex-col items-center justify-center'>
      <h2 className='text-3xl font-bold mb-6 text-white'>
        {radiologist.radiologistName}'s Dashboard
      </h2>

      {/* Image Display */}
      <div className='relative w-[600px] h-[400px] bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center shadow-lg'>
        {/* Previous Button */}
        <button
          onClick={handlePrevImage}
          className='absolute left-4 text-white text-2xl bg-black bg-opacity-50 px-4 py-2 rounded-full hover:bg-opacity-75'
        >
          &lt;
        </button>

        {/* Current Image */}
        <img
          src={images[currentImageIndex].url}
          alt={images[currentImageIndex].name}
          className='w-full h-full object-cover rounded-lg'
        />

        {/* Next Button */}
        <button
          onClick={handleNextImage}
          className='absolute right-4 text-white text-2xl bg-black bg-opacity-50 px-4 py-2 rounded-full hover:bg-opacity-75'
        >
          &gt;
        </button>
      </div>

      {/* Image Name */}
      <p className='text-white mt-4'>{images[currentImageIndex].name}</p>

      {/* Render Chest Classification Options */}
      {datasetType === 'Chest' && (
        <div className='mt-6 grid grid-cols-4 gap-4'>
          <button
            onClick={() => moveToFolder('Normal')}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg'
          >
            Normal
          </button>
          <button
            onClick={() => moveToFolder('Pneumonia')}
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg'
          >
            Pneumonia
          </button>
          <button
            onClick={() => moveToFolder('COVID-19')}
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
          >
            COVID-19
          </button>
          <button
            onClick={() => moveToFolder('Other')}
            className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg'
          >
            Other
          </button>
        </div>
      )}

      {/* Render Kidney Classification Options */}
      {datasetType === 'Kidney' && (
        <div className='mt-6 grid grid-cols-4 gap-4'>
          <button
            onClick={() => moveToFolder('Normal')}
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg'
          >
            Normal
          </button>
          <button
            onClick={() => moveToFolder('Infection')}
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg'
          >
            Infection
          </button>
          <button
            onClick={() => moveToFolder('Tumor')}
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
          >
            Tumor
          </button>
          <button
            onClick={() => moveToFolder('Other')}
            className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg'
          >
            Other
          </button>
        </div>
      )}
    </div>
  );
};

export default RadiologistPage;
