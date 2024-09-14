// src/components/SharedComponents/ImageCarousel.jsx
import React, { useState } from 'react'

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Function to go to the next image
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  // Function to go to the previous image
  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className='relative w-[600px] h-[400px] bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center'>
      {/* Image Display */}
      <img
        src={images[currentImageIndex].url}
        alt={images[currentImageIndex].name}
        className='w-full h-full object-cover rounded-lg'
      />

      {/* Left Arrow */}
      <button
        onClick={goToPrevImage}
        className='absolute left-4 text-white text-3xl bg-black bg-opacity-50 px-4 py-2 rounded-full hover:bg-opacity-75'
      >
        &lt;
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNextImage}
        className='absolute right-4 text-white text-3xl bg-black bg-opacity-50 px-4 py-2 rounded-full hover:bg-opacity-75'
      >
        &gt;
      </button>
    </div>
  )
}

export default ImageCarousel
