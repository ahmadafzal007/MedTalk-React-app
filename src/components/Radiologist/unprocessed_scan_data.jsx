import React, { useState, useEffect } from "react";
import axios from "axios";

const KidneyScanImages = ({ folderName, onClose }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [processedData, setProcessedData] = useState({
    normal: [],
    cyst: [],
    tumor: [],
    stone: [],
  });

  const getFolderPath = () => "kidney_scan";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/folder/kidneyscan");
        const imageFiles = response.data.files || []; // API returns { files: [...] }
        setImages(imageFiles);
        if (imageFiles.length > 0) setCurrentImage(imageFiles[0]);
      } catch (error) {
        console.error("Error fetching kidney scan images: ", error);
      }
    };

    fetchImages();
  }, []);

  const handlePreviousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setCurrentImage(images[(currentIndex - 1 + images.length) % images.length]);
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setCurrentImage(images[(currentIndex + 1) % images.length]);
  };

  const handleLabelImage = async (label) => {
    try {
      const response = await axios.post("http://localhost:3000/api/folder/movekidneyscan", {
        imageName: currentImage,
        label,
      });

      if (response.status === 200) {
        const newProcessedData = { ...processedData };
        newProcessedData[label].push(currentImage);
        setProcessedData(newProcessedData);

        const remainingImages = images.filter((_, index) => index !== currentIndex);
        setImages(remainingImages);

        if (remainingImages.length > 0) {
          setCurrentIndex(currentIndex % remainingImages.length);
          setCurrentImage(remainingImages[currentIndex % remainingImages.length]);
        } else {
          setCurrentImage(null);
        }
      } else {
        console.error(`Failed to move image: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error moving image: ", error);
    }
  };

  return (
    <div className="inset-0 bg-black bg-opacity-70 p-8 overflow-y-auto backdrop-blur-sm">
     
      <h3 className="text-lg font-medium text-white mb-6 animate__animated animate__fadeIn">
        Kidney Scan Images:
      </h3>

      <div className="flex flex-col items-center">
        {images.length > 0 ? (
          currentImage && (
            <>
              <div className="relative flex items-center border border-gray-700 justify-center w-[600px] h-[550px] bg-[#1e1e22] p-6 rounded-lg shadow-lg">
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-0 text-white text-3xl font-bold transition-transform transform hover:scale-125"
                >
                  &lt;
                </button>
                <img
                  src={`/datasets/${getFolderPath()}/${currentImage}`}
                  alt={currentImage}
                  className="w-full h-full object-cover rounded-lg transition-transform transform hover:scale-105"
                />
                <button
                  onClick={handleNextImage}
                  className="absolute right-0 text-white text-3xl font-bold transition-transform transform hover:scale-125"
                >
                  &gt;
                </button>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => handleLabelImage("normal")}
                  className="btn border-2 bg-[#1e1e22] border-gray-700  btn-success px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all"
                >
                  Normal
                </button>
                <button
                  onClick={() => handleLabelImage("cyst")}
                  className="btn border-2 bg-[#1e1e22] border-gray-700 btn-warning px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all"
                >
                  Cyst
                </button>
                <button
                  onClick={() => handleLabelImage("tumor")}
                  className="btn border-2 bg-[#1e1e22] border-gray-700  btn-danger px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all"
                >
                  Tumor
                </button>
                <button
                  onClick={() => handleLabelImage("stone")}
                  className="btn border-2 bg-[#1e1e22] border-gray-700  btn-info px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all"
                >
                  Stone
                </button>
              </div>
            </>
          )
        ) : (
          <p className="text-lg text-white mt-8">No images present.</p>
        )}
      </div>

      
    </div>
  );
};

export default KidneyScanImages;
