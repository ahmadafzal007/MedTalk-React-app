import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Layers,
  File,
  BarChart,
  ChevronDown,
} from 'lucide-react';

const Sidebar = ({ setActiveScreen }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isKidneyDropdownOpen, setIsKidneyDropdownOpen] = useState(false);
  const [isChestXrayDropdownOpen, setIsChestXrayDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebarExpand = () => {
    setIsExpanded(!isExpanded);
    localStorage.setItem('isExpanded', !isExpanded);
  };

  const toggleKidneyDropdown = () => {
    setIsKidneyDropdownOpen(!isKidneyDropdownOpen);
  };

  const toggleChestXrayDropdown = () => {
    setIsChestXrayDropdownOpen(!isChestXrayDropdownOpen);
  };

  return (
    <div
      className={`font-poppins h-screen flex-col justify-between text-white px-4 py-6 backdrop-blur-lg shadow-xl bg-[#151518] border border-gray-700 transform transition-all ${
        isExpanded ? 'w-[300px] max-w-[320px]' : 'w-[4.75rem]'
      } overflow-y-auto overflow-x-hidden sm:flex sm:inline-flex`}
    >
      <div className="w-full">
        {/* Fixed toggle button */}
        <button
          onClick={toggleSidebarExpand}
          className="absolute top-4 left-4 text-white focus:outline-none transition-transform duration-300"
        >
          <Menu size={20} className="text-white" />
        </button>

        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className={`${isExpanded ? 'block' : 'hidden'} text-lg font-normal`}>
            <span className="font-bold text-2xl">M</span>ed<span className="font-bold text-2xl">T</span>alk
          </h2>
        </div>

        <ul className="p-4 pl-0 space-y-3">
          {/* Unprocessed Kidney Scan */}
          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={() => setActiveScreen('UnprocessedKidneyScan')}
          >
            <Layers size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Unprocessed Kidney Scan
            </span>
          </li>

          {/* Unprocessed Chest X-ray */}
          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={() => setActiveScreen('Unprocessedxray')}
          >
            <File size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Unprocessed Chest X-ray
            </span>
          </li>

          {/* Processed Kidney Scan Dropdown */}
          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={toggleKidneyDropdown}
          >
            <BarChart size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Processed Kidney Scan
            </span>
            <ChevronDown size={16} className={`ml-2 ${isKidneyDropdownOpen ? 'rotate-180' : ''}`} />
          </li>
          {isKidneyDropdownOpen && (
            <ul className="pl-6 space-y-2">
              <li
                className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
                onClick={() => setActiveScreen('ProcessedKidneyScanNormal')}
              >
                <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>Normal</span>
              </li>
              <li
                className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
                onClick={() => setActiveScreen('ProcessedKidneyScanCyst')}
              >
                <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>Cyst</span>
              </li>
              <li
                className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
                onClick={() => setActiveScreen('ProcessedKidneyScanTumor')}
              >
                <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>Tumor</span>
              </li>
              <li
                className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
                onClick={() => setActiveScreen('ProcessedKidneyScanStone')}
              >
                <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>Stone</span>
              </li>
            </ul>
          )}

          {/* Processed Chest X-ray Dropdown */}
          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={toggleChestXrayDropdown}
          >
            <BarChart size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Processed Chest X-ray
            </span>
            <ChevronDown size={16} className={`ml-2 ${isChestXrayDropdownOpen ? 'rotate-180' : ''}`} />
          </li>
          {isChestXrayDropdownOpen && (
            <ul className="pl-6 space-y-2">
              <li
                className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
                onClick={() => setActiveScreen('ProcessedChestXrayNormal')}
              >
                <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>Normal</span>
              </li>
              <li
                className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
                onClick={() => setActiveScreen('ProcessedChestXrayCovid')}
              >
                <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>Covid</span>
              </li>
              <li
                className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
                onClick={() => setActiveScreen('ProcessedChestXrayPneumonia')}
              >
                <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>Pneumonia</span>
              </li>
              <li
                className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
                onClick={() => setActiveScreen('ProcessedChestXrayTuberculosis')}
              >
                <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>Tuberculosis</span>
              </li>
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
