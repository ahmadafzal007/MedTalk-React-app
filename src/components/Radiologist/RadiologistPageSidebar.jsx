import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  XCircle, // For chest X-rays
  CheckCircle, // For processed scans
  Folder, // For dropdowns
  ChevronDown,
  LogOut, // Icon for logout
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

  const handleLogout = () => {
    // Add any logout logic here if needed (e.g., clearing user data)
    navigate('/login');
  };

  return (
    <div
      className={`font-poppins h-screen flex flex-col justify-between text-white px-4 py-6 backdrop-blur-lg shadow-xl bg-[#151518] border border-gray-700 transform transition-all ${
        isExpanded ? 'w-[300px] max-w-[320px]' : 'w-[4.75rem]'
      } overflow-y-auto overflow-x-hidden sm:flex sm:inline-flex`}
    >
      {/* Top Section */}
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
            <span className="font-bold text-2xl">M</span>ed
            <span className="font-bold text-2xl">T</span>alk
          </h2>
        </div>

        <ul className="p-4 pl-0 space-y-3">
          {/* Unprocessed Kidney Scan */}
          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={() => setActiveScreen('UnprocessedKidneyScan')}
          >
            <XCircle size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Unprocessed Kidney Scan
            </span>
          </li>

          {/* Unprocessed Chest X-ray */}
          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={() => setActiveScreen('Unprocessedxray')}
          >
            <XCircle size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Unprocessed Chest X-ray
            </span>
          </li>

          {/* Processed Kidney Scan Dropdown */}
          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={toggleKidneyDropdown}
          >
            <CheckCircle size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Processed Kidney Scan
            </span>
            <ChevronDown size={16} className={`ml-2 ${isKidneyDropdownOpen ? 'rotate-180' : ''}`} />
          </li>
          {isKidneyDropdownOpen && (
            <ul className="pl-6 space-y-2">
              {/* Processed Kidney Scans */}
              {['Normal', 'Cyst', 'Tumor', 'Stone'].map((label) => (
                <li
                  key={label}
                  className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
                  onClick={() => setActiveScreen(`ProcessedKidneyScan${label}`)}
                >
                  <Folder size={16} className="mr-2 text-white" />
                  <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>{label}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Processed Chest X-ray Dropdown */}
          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={toggleChestXrayDropdown}
          >
            <CheckCircle size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Processed Chest X-ray
            </span>
            <ChevronDown size={16} className={`ml-2 ${isChestXrayDropdownOpen ? 'rotate-180' : ''}`} />
          </li>
          {isChestXrayDropdownOpen && (
            <ul className="pl-6 space-y-2">
              {/* Processed Chest X-rays */}
              {['Normal', 'Covid', 'Pneumonia', 'Tuberculosis'].map((label) => (
                <li
                  key={label}
                  className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
                  onClick={() => setActiveScreen(`ProcessedChestXray${label}`)}
                >
                  <Folder size={16} className="mr-2 text-white" />
                  <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>{label}</span>
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>

      {/* Bottom Section - Logout */}
      <div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 rounded-lg hover:bg-[#1e1e22] transition-colors text-left"
        >
          <LogOut size={20} className="mr-3 text-white" />
          <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
