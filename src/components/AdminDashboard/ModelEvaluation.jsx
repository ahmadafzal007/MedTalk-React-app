import React, { useState } from "react";

const ModelStatsDashboard = () => {
  const [selectedModel, setSelectedModel] = useState("chest");
  const [enlargedImage, setEnlargedImage] = useState(null);

  // Image paths for Chest and Kidney models
  const images = {
    chest: {
      confusion: "/chest/confusion.png",
      accuracy: "/chest/acccuracy.png",
      loss: "/chest/loss.png",
    },
    kidney: {
      confusion: "/kidney/confusion.png",
      accuracy: "/kidney/accuracy.png",
      loss: "/kidney/loss.png",
    },
  };

  const handleImageClick = (imageSrc) => {
    setEnlargedImage(imageSrc);
  };

  const closeEnlargedView = () => {
    setEnlargedImage(null);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">
        M<span className="font-normal">odel</span> S
        <span className="font-normal">tats</span> D
        <span className="font-normal">ashboard</span>
      </h1>

      {/* Toggle buttons for Chest and Kidney */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setSelectedModel("chest")}
          className={`px-6 py-3 rounded-lg border-2 text-sm ${
            selectedModel === "chest"
              ? "bg-[#2d2d35] text-white border-gray-700"
              : "bg-[#151518] text-gray-400 hover:bg-[#313138]"
          }`}
        >
          Chest Model Stats
        </button>
        <button
          onClick={() => setSelectedModel("kidney")}
          className={`px-6 py-3 rounded-lg border-2 text-sm ${
            selectedModel === "kidney"
              ? "bg-[#2d2d35] text-white border-gray-700"
              : "bg-[#151518] text-gray-400 hover:bg-[#313138]"
          }`}
        >
          Kidney Model Stats
        </button>
      </div>

      {/* Dashboard images */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4 sm:px-12">
        {Object.keys(images[selectedModel]).map((key) => (
          <div
            key={key}
            className="bg-[#151518] p-4 rounded-lg border border-gray-700"
          >
            <h3 className="text-center mb-4 text-xs font-normal capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </h3>
            <img
              src={images[selectedModel][key]}
              alt={`${selectedModel} ${key}`}
              className="rounded-lg w-full cursor-pointer"
              onClick={() => handleImageClick(images[selectedModel][key])}
            />
          </div>
        ))}
      </div>

      {/* Enlarged image view */}
      {enlargedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative">
            <button
              onClick={closeEnlargedView}
              className="absolute border-2 border-black top-0 right-0 m-4 text-white text-xs bg-[#4c4c59] p-2 rounded-full hover:bg-gray-600"
            >
              &#10005;
            </button>
            <img
              src={enlargedImage}
              alt="Enlarged view"
              className="max-w-full max-h-screen rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelStatsDashboard;
