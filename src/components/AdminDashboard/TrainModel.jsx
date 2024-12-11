import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { ClipLoader } from "react-spinners";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FineTuneModelPage = () => {
  const [modelType, setModelType] = useState("");
  const [datasetPath, setDatasetPath] = useState("");
  const [learningRate, setLearningRate] = useState(0.0001);
  const [epochs, setEpochs] = useState(20);
  const [batchSize, setBatchSize] = useState(32);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentChart, setCurrentChart] = useState(0); // State to toggle between charts
  const [showChart, setShowChart] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);  // Show custom confirm dialog
  const [showAlert, setShowAlert] = useState(false);  // Show custom alert dialog
  const [alertMessage, setAlertMessage] = useState("");  // Message for custom alert



  const datasetPaths = {
    chest: "D:\\MedTalk Final Year Project\\MedTalk Frontend\\public\\processedChestData",
    kidney: "D:\\MedTalk Final Year Project\\MedTalk Frontend\\public\\processedKidneyScan",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const selectedDatasetPath = datasetPaths[modelType];
    const parsedLearningRate = parseFloat(learningRate);

    const payload = {
      dataset_path: selectedDatasetPath,
      model_type: modelType,
      epochs: parseInt(epochs, 10),
      batch_size: parseInt(batchSize, 10),
      learning_rate: parsedLearningRate,
    };
console.log(payload)
    try {
      const res = await axios.post("http://localhost:4000/train", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data && res.data.history) {
        setResponse(res.data);
        setShowChart(true);
      } else {
        setResponse({ error: "Invalid response format received from the server." });
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse({
        error: error.response?.data?.message || "Failed to communicate with the server.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleChart = (direction) => {
    if (direction === "next") {
      setCurrentChart((prev) => (prev + 1) % 2); // Toggle between 0 and 1
    } else {
      setCurrentChart((prev) => (prev - 1 + 2) % 2); // Handle previous toggle
    }
  };

  const accuracyChartData = {
    labels: response?.history?.accuracy?.map((_, index) => `Epoch ${index + 1}`) || [],
    datasets: [
      {
        label: "Training Accuracy",
        data: response?.history?.accuracy || [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
      },
      {
        label: "Validation Accuracy",
        data: response?.history?.val_accuracy || [],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
      },
    ],
  };

  const lossChartData = {
    labels: response?.history?.loss?.map((_, index) => `Epoch ${index + 1}`) || [],
    datasets: [
      {
        label: "Training Loss",
        data: response?.history?.loss || [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
      {
        label: "Validation Loss",
        data: response?.history?.val_loss || [],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: false,
      },
    ],
  };

  const handleCommitModel = async () => {
    const payload = {
      model_type: modelType,     
    };

    console.log('payload: ', payload)
    try {
      const res = await axios.post("http://localhost:4000/save", {payload}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.message === "Model saved successfully") {
        setAlertMessage("The fine-tuned model has been committed successfully.");
      }
    } catch (error) {
      setAlertMessage("Failed to commit the model. Please try again.");
      console.error("Error committing model:", error);
    } finally {
      setShowConfirm(false); // Close confirmation box
    }
  };

  const handleConfirm = () => {
    setShowConfirm(true);
  };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
  };

  const handleAlertClose = () => {
    setAlertMessage(null);
  };



  return (
    <div className="bg-black min-h-screen mt-4  justify-center items-center text-white">
           <h1 className="text-4xl font-bold mb-8 text-center animate__animated animate__fadeIn">
             F<span className="font-normal">ine-</span>T<span className="font-normal">une</span> M<span className="font-normal">odel</span>
           </h1>
      <form onSubmit={handleSubmit} className="p-8  rounded-xl shadow-lg w-full ">
        
              <div className="mb-6 flex space-x-4">
           <div className="w-1/2">
             <label className="text-sm font-medium block mb-2">Model Type:</label>            <select
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              required
              className="text-white text-xs bg-[#151518] border border-gray-700 p-3 rounded-lg w-full transition-all hover:bg-[#313138]"
            >
              <option value="">Select Model Type</option>
              <option value="chest">Chest</option>
              <option value="kidney">Kidney</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="text-sm font-medium block mb-2">Dataset Path:</label>
            <select
              value={datasetPath}
              onChange={(e) => setDatasetPath(e.target.value)}
              required
              className="text-white text-xs bg-[#151518] border border-gray-700 p-3 rounded-lg w-full transition-all hover:bg-[#313138]"
            >
              <option value="">Select Dataset Path</option>
              <option value="chest">Chest Dataset</option>
              <option value="kidney">Kidney Dataset</option>
            </select>
          </div>
        </div>

        <div className="mb-6 flex space-x-4">

          <div className="w-1/2">
          <label className="text-sm font-medium block mb-2">Learning Rate:</label>
          <select
            value={learningRate}
            onChange={(e) => setLearningRate(e.target.value)}
            required
            className="text-white text-xs bg-[#151518] border border-gray-700 p-3 rounded-lg w-full transition-all hover:bg-[#313138]"
          >

            {/* <option >Select Dataset </option> */}
            <option value={0.0001}>1e-4</option>
            <option value={0.001}>1e-3</option>
            <option value={0.00001}>1e-5</option>
            <option value={0.01}>1e-2</option>

          
          </select>
        </div>

          <div className="w-1/2">
            <label className="text-sm font-medium block mb-2">Epochs:</label>
            <input
              type="number"
              value={epochs}
              onChange={(e) => setEpochs(e.target.value)}
              min="1"
              max="100"
              required
              className="text-white text-xs bg-[#151518] border border-gray-700 p-3 rounded-lg w-full transition-all hover:bg-[#313138]"
            />
          </div>
        </div>


        <div className="mb-6">
          <label className="text-sm font-medium block mb-2">Batch Size:</label>
          <input
            type="number"
            value={batchSize}
            onChange={(e) => setBatchSize(e.target.value)}
            min="1"
            required
            className="text-white text-xs bg-[#151518] border border-gray-700 p-3 rounded-lg w-full transition-all hover:bg-[#313138]"
          />
        </div>

        <button
           type="submit"
           disabled={loading}
           className="bg-[#151518] w-32 border-2 border-gray-700 text-xs text-white px-6 py-3 rounded-lg transition-all hover:bg-[#313138] mt-4"
         >
           {loading ? "Loading..." : "Submit"}
         </button>
      </form>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50">
          <ClipLoader color="#68687f" size={100} />
          <div className="mt-4 text-white text-xs">Training in Progress...</div>
        </div>
      )}

      {showChart && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50 p-8">
          <button
            onClick={() => setShowChart(false)}
            className="absolute top-4 right-4 border-2 border-gray-700 bg-[#151518] text-white px-4 py-2 rounded-lg"
          >
            X
          </button>
          <div className="w-full flex items-center justify-center max-w-5xl">
            {currentChart === 0 ? (
              <Line data={accuracyChartData} />
            ) : (
              <Line data={lossChartData} />
            )}
          </div>
          <div className="flex justify-between w-full mt-6">
            <button
              onClick={() => handleToggleChart("prev")}
              className="bg-[#151518]  border-2 border-gray-700 text-xs text-white px-4 py-3 rounded-lg transition-all hover:bg-[#313138] mt-4"
              >
              &lt; 
            </button>
            <button
              onClick={() => handleToggleChart("next")}
              className="bg-[#151518]  border-2 border-gray-700 text-xs text-white px-4 py-3 rounded-lg transition-all hover:bg-[#313138] mt-4"
              >
               &gt;
            </button>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={handleConfirm}
              className="bg-[#151518] w-44 border-2 border-gray-700 text-xs text-white px-6 py-3 rounded-lg transition-all hover:bg-[#313138] mt-4"
            >
              Commit Model
            </button>
          </div>
      
        </div>
      )}

      {/* Confirmation Box */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
        <div className="bg-[#151518] p-6 rounded-lg border border-gray-700 text-white max-w-sm relative">
          {/* Close button */}
          <button
            onClick={handleCancelConfirm}
            className="absolute top-2 bg-[#2d2d35] px-1 rounded-2xl right-2 border-2 border-gray-700 text-white bg-transparent hover:text-gray-400 text-xs"
            aria-label="Close"
          >
            &times;
          </button>
          
          <p className="text-center text-sm mb-4">
            Note: Are you sure you want to overwrite the existing model?
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleCommitModel}
              className="bg-[#2d2d35] text-white px-3 py-2 rounded text-xs hover:bg-gray-600 border-2 border-gray-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      
      )}

      {/* Alert Box */}
      {alertMessage && (
        <div className="fixed bottom-4 text-xs right-4 bg-[#151518] border border-gray-700 text-white px-4 py-3 rounded-md z-50 shadow-lg">
          <p>{alertMessage}</p>
          <button
            onClick={handleAlertClose}
            className="text-red-500 hover:text-red-600 text-xs underline mt-2 "
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default FineTuneModelPage;

