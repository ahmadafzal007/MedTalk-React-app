import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate
import { FaArrowLeft } from 'react-icons/fa'; // Importing the back arrow icon

const MedTalkProUpgradeCard = () => {
  const navigate = useNavigate(); // Using useNavigate for navigation

  const handleUpgrade = () => {
    navigate('/upgradeform'); // Navigate to the upgrade form page
  };

  const handleBack = () => {
    navigate('/main'); // Redirecting to the main route
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative">
      {/* Back Icon */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-white bg-transparent focus:outline-none transition-transform duration-300"
      >
        <FaArrowLeft className="text-2xl" />
      </button>

      {/* Logo outside the card */}
      <div className="absolute top-24 flex justify-center w-full">
        <img
          src="/medtalk-circle.png" // Adjust the path if necessary
          alt="MedTalk Logo"
          className="md:h-24 h-16 w-auto" // Adjust size as needed
        />
      </div>

      <div className="max-w-3xl font-poppins mx-auto bg-[#151518] shadow-lg rounded-lg p-6 border border-gray-700 flex flex-col items-center mt-20">
        <h2 className="text-2xl font-semibold mb-4 text-center">Upgrade to MedTalk Pro</h2>
        <p className="mb-1 text-sm text-start text-gray-300">
          <span className="font-bold">Note:</span> You can upgrade to MedTalk Pro. This professional platform is exclusively for licensed doctors. 
          To ensure the integrity and quality of our community, only those associated with the provided 
          hospitals may upgrade. If you fulfill these conditions, please proceed to upgrade.
        </p>
        
        <div className="flex justify-center mt-4">
          <button
            onClick={handleUpgrade}
            className="bg-[#151518] border text-sm border-gray-700 text-white font-semibold py-2 px-6 rounded-lg hover:border-white transition"
          >
            Upgrade
          </button>
        </div>
        
        {/* Bottom Note */}
        {/* <div className="mt-6 text-center text-xs text-gray-300">
          <p>If you are a hospital, you can register here:</p>
          <p className="text-blue-600 font-light underline">
            <a href="/path-to-hospital-registration" target="_blank" rel="noopener noreferrer">
              Register as a Hospital
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default MedTalkProUpgradeCard;