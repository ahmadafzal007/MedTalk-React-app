import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const getFolderPath = (folderName = "Chest") => {
    if (folderName === "Chest") return "chest_xray";
    if (folderName === "Kidney") return "kidney_scan";
    return folderName;
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const folderPath = getFolderPath(folderName);
        if (!folderPath) {
          console.error("Folder path is undefined!");
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/folder`);
        const imageFiles = response.data.Chest || []; // Assuming API returns { files: [...] }
        setImages(imageFiles);
        if (imageFiles.length > 0) setCurrentImage(imageFiles[0]);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchImages();
  }, [folderName]);

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
      const response = await axios.post("http://localhost:3000/api/folder/movexray", {
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
          setCurrentImage(null); // No images left
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
        {folderName} Unlabelled Chest x-ray:
      </h3>

      <div className="flex flex-col  items-center">
        {images.length > 0 ? (
          currentImage && (
            <>
              <div className="relative flex items-center justify-center w-[600px] h-[550px] bg-[#1e1e22] border border-gray-700 p-6 rounded-lg shadow-lg">
                <button
                  onClick={handlePreviousImage}
                  className="absolute left-0 text-white text-3xl font-bold transition-transform transform hover:scale-125"
                >
                  &lt;
                </button>
                <img
                  src={`/datasets/${getFolderPath(folderName)}/${currentImage}`}
                  alt={currentImage}
                  className="w-full h-full object-contain rounded-lg transition-transform transform hover:scale-105"
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
                  className="btn border-2 border-gray-700 bg-[#1e1e22]  btn-success px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all"
                >
                  Normal
                </button>
                <button
                  onClick={() => handleLabelImage("tb")}
                  className="btn border-2 border-gray-700 bg-[#1e1e22] btn-danger px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all"
                >
                  TB
                </button>
                <button
                  onClick={() => handleLabelImage("pneumonia")}
                  className="btn border-2 border-gray-700 bg-[#1e1e22] btn-warning px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all"
                >
                  Pneumonia
                </button>
                <button
                  onClick={() => handleLabelImage("covid")}
                  className="btn border-2 border-gray-700 bg-[#1e1e22] btn-info px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all"
                >
                  COVID
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

export default UnprocessedImages;
