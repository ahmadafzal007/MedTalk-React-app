import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayProcessedKidneyScan = ({ label }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12; // Number of images per page

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:3000/api/folder/processed", {
          label: label || "cyst", // Default label to 'cyst'
        });
        setImages(response.data.files || []); // API returns { files: [...] }
      } catch (error) {
        console.error("Error fetching processed kidney scan images: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [label]);

  // Calculate indices for pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // Pagination controls
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="inset-0 bg-black bg-opacity-70 p-8 pt-0 overflow-y-auto backdrop-blur-sm">
      <h3 className="text-lg font-medium text-white mb-6 animate__animated animate__fadeIn">
        Processed Kidney Scan Images ({label || "cyst"}):
      </h3>

      {loading ? (
        <p className="text-lg text-gray-400">Loading images...</p>
      ) : images.length > 0 ? (
        <>
          <div className="grid text-xs grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentImages.map((image, index) => (
              <div
                key={index}
                className="bg-[#151518] p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <p className="text-white mb-4 text-center">{image}</p>
                <img
                  src={`/processedKidneyScan/${label || "cyst"}/${image}`}
                  alt={image}
                  className="w-full h-28 object-cover rounded-lg transition-transform transform hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {images.length > imagesPerPage && (
            <div className="flex justify-between items-center mt-6 text-white">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 bg-gray-700 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"}`}
              >
                &lt;
              </button>
              <p className="text-xs">
                {currentPage} of {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 bg-gray-700 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"}`}
              >
                &gt;
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-lg text-gray-400">
          No images found in the {label || "cyst"} folder.
        </p>
      )}
    </div>
  );
};

export default DisplayProcessedKidneyScan;
