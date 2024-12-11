import React, { useState } from "react";
import axios from "axios";

// FolderView Component
const FolderView = ({ folderName, label, images, onClose }) => {
  const getFolderPath = (folderName) => {
    if (folderName === "Chest") {
      return "processedChestData";
    } else if (folderName === "Kidney") {
      return "processedKidneyScan";
    }
    return folderName;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 p-8 overflow-y-auto backdrop-blur-sm">
      <button
        onClick={onClose}
        className="text-white mb-4 transition-all hover:scale-105"
      >
        &#8592; Back
      </button>
      <h3 className="text-lg font-medium text-white mb-6 animate__animated animate__fadeIn">
        {folderName} Images ({label}):
      </h3>
      <div className="grid text-xs grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image, index) => {
          const folderPath = getFolderPath(folderName);
          const imagePath = `/public/${folderPath}/${label}/${image}`;
          return (
            <div
              key={index}
              className="bg-[#151518] p-6 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
            >
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

// Main Page Component
const DataSelectionPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null); // "chest" or "kidney"
  const [selectedLabel, setSelectedLabel] = useState(null); // Label for the selected category
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFolderView, setShowFolderView] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedLabel(null); // Reset the selected label when switching categories
    setImages([]); // Clear images when switching categories
  };

  const handleLabelSelect = async (label) => {
    setSelectedLabel(label);
    setLoading(true);
    try {
      let response;
      if (selectedCategory === "chest") {
        response = await axios.post("http://localhost:3000/api/folder/xray", { label });
      } else if (selectedCategory === "kidney") {
        response = await axios.post("http://localhost:3000/api/folder/processed", { label });
      }
      setImages(response.data.files || []);
      setShowFolderView(true); // Show the folder view with the fetched images
    } catch (error) {
      console.error("Error fetching image data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const dropdownOptions =
    selectedCategory === "chest"
      ? ["normal", "covid", "pneumonia", "tb"]
      : ["normal", "cyst", "stone", "tumor"];

  return (
    <div className="p-10 flex-row items-center justify-center   bg-gradient-to-br  to-black min-h-screen h-screen overflow-hidden relative text-white">
      <h1 className="text-4xl font-bold text-white mb-6 animate__animated animate__fadeIn">
         D<span className="font-normal">ataset</span> V<span className="font-normal">iewer</span>
      </h1>

      {/* Category Selection */}
      <div className="flex gap-6">
        <button
          className={`px-6 py-3 rounded-lg border border-gray-700 text-sm shadow-lg text-white  ${
            selectedCategory === "chest"
              ? "bg-[#292930]"
              : "bg-[#151518] hover:bg-[#27272c]"
          }`}
          onClick={() => handleCategorySelect("chest")}
        >
          Chest Xray 
        </button>
        <button
          className={`px-6 py-3 rounded-lg border border-gray-700 text-sm shadow-lg text-white  ${
            selectedCategory === "kidney"
              ? "bg-[#292930]"
              : "bg-[#151518] hover:bg-[#27272c]"
          }`}
          onClick={() => handleCategorySelect("kidney")}
        >
          Kidney Scan
        </button>
      </div>

      {/* Dropdown for Label Selection */}
      {selectedCategory && (
      <div className="mt-6 bg-gradient-to-br  to-black min-h-screen max-h-screen overflow-hidden relative text-white">
          <h2 className="text-md font-normal text-white mb-4 animate__animated animate__fadeIn">
            Select a Label for {selectedCategory === "chest" ? "Chest X-ray" : "Kidney Scan"}:
          </h2>
          <div className="flex  flex-wrap gap-4">
            {dropdownOptions.map((label) => (
              <button
                key={label}
                className={`px-6 py-2 border border-gray-700 text-sm rounded-lg shadow-md text-white ${
                  selectedLabel === label
                    ? "bg-[#292930]"
                    : "bg-[#151518] hover:bg-[#27272c]"
                }`}
                onClick={() => handleLabelSelect(label)}
              >
                {label.charAt(0).toUpperCase() + label.slice(1)} {/* Capitalize */}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Folder View Popup */}
      {showFolderView && (
        <FolderView
          folderName={selectedCategory === "chest" ? "Chest" : "Kidney"}
          label={selectedLabel}  // Pass the label to the FolderView
          images={images}
          onClose={() => setShowFolderView(false)}
        />
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="mt-10">
          <p className="text-lg text-gray-400">Loading images...</p>
        </div>
      )}
    </div>
  );
};

export default DataSelectionPage;
