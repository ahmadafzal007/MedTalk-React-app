import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  UserPlus,
  Hospital,
  Settings,
  File,
  Layers,
  AlertTriangle,
  Database,
  BarChart,
  CheckSquare,
} from 'lucide-react';

const Sidebar = ({ setActiveScreen }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const toggleSidebarExpand = () => {
    setIsExpanded(!isExpanded);
    localStorage.setItem('isExpanded', !isExpanded);
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
          

          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={() => setActiveScreen('Datasets')}
          >
            <Layers size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Datasets
            </span>
          </li>

          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={() => setActiveScreen('UnprocessedDatasets')}
          >
            <File size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Unprocessed Datasets
            </span>
          </li>

          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={() => setActiveScreen('RegisterRadiologist')}
          >
            <UserPlus size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Register Radiologist
            </span>
          </li>

          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={() => navigate('/radiologist')}
          >
            <BarChart size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Radiologist Dashboard
            </span>
          </li>

          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={() => setActiveScreen('TrainModel')}
          >
            <Settings size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Train Model
            </span>
          </li>

          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={() => setActiveScreen('UnauthorizedHospitals')}
          >
            <AlertTriangle size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Unauthorized Hospitals
            </span>
          </li>

          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={() => setActiveScreen('RegisteredHospitals')}
          >
            <Database size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Registered Hospitals
            </span>
          </li>

          {/* New Model Evaluation Option */}
          <li
            className="hover:bg-[#1e1e22] p-2 rounded-lg flex items-center cursor-pointer transition-colors"
            onClick={() => setActiveScreen('ModelEvaluation')}
          >
            <CheckSquare size={20} className="mr-3 text-white" />
            <span className={`${isExpanded ? 'block text-xs font-normal' : 'hidden'}`}>
              Model Evaluation
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
