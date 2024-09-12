import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
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
} from 'lucide-react'

const Sidebar = ({ setActiveScreen }) => {
  const [isExpanded, setIsExpanded] = useState(true) // Sidebar expansion state
  const navigate = useNavigate() // Initialize navigate

  // Toggle sidebar expansion
  const toggleSidebarExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={`min-h-screen bg-[#131314] text-white px-4 py-6 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      } relative`}
      style={{
        boxShadow:
          'inset 0 0 15px rgba(255, 255, 255, 0.1), 0 4px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* MedTalk Icon and Toggle Button */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          {isExpanded && <h1 className='ml-4 text-2xl font-bold'>MedTalk</h1>}
        </div>

        {/* Toggle Sidebar Button */}
        <button
          onClick={toggleSidebarExpand}
          className='p-2 rounded-full bg-black hover:bg-gray-800 transition-all ease-in-out shadow-lg'
          style={{
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
          }}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu Options */}
      <div className='mt-8 flex flex-col space-y-4'>
        {/* Register Hospital */}
        <div
          className={`flex items-center gap-4 bg-black p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all ease-in-out ${
            isExpanded ? 'w-full' : 'w-12'
          } cursor-pointer`}
          onClick={() => setActiveScreen('RegisterHospital')}
          style={{
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
          }}
        >
          <UserPlus size={20} className='text-white' />
          {isExpanded && <span>Register Hospital</span>}
        </div>

        {/* Approve Hospitals */}
        <div
          className={`flex items-center gap-4 bg-black p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all ease-in-out ${
            isExpanded ? 'w-full' : 'w-12'
          } cursor-pointer`}
          onClick={() => setActiveScreen('ApproveHospitals')}
          style={{
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
          }}
        >
          <Hospital size={20} className='text-white' />
          {isExpanded && <span>Approve Hospitals</span>}
        </div>

        {/* Datasets */}
        <div
          className={`flex items-center gap-4 bg-black p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all ease-in-out ${
            isExpanded ? 'w-full' : 'w-12'
          } cursor-pointer`}
          onClick={() => setActiveScreen('Datasets')}
          style={{
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
          }}
        >
          <Layers size={20} className='text-white' />
          {isExpanded && <span>Datasets</span>}
        </div>

        {/* Unprocessed Datasets */}
        <div
          className={`flex items-center gap-4 bg-black p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all ease-in-out ${
            isExpanded ? 'w-full' : 'w-12'
          } cursor-pointer`}
          onClick={() => setActiveScreen('UnprocessedDatasets')}
          style={{
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
          }}
        >
          <File size={20} className='text-white' />
          {isExpanded && <span>Unprocessed Datasets</span>}
        </div>

        {/* Register Radiologist */}
        <div
          className={`flex items-center gap-4 bg-black p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all ease-in-out ${
            isExpanded ? 'w-full' : 'w-12'
          } cursor-pointer`}
          onClick={() => setActiveScreen('RegisterRadiologist')}
          style={{
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
          }}
        >
          <UserPlus size={20} className='text-white' />
          {isExpanded && <span>Register Radiologist</span>}
        </div>

        {/* Radiologist Dashboard */}
        <div
          className={`flex items-center gap-4 bg-black p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all ease-in-out ${
            isExpanded ? 'w-full' : 'w-12'
          } cursor-pointer`}
          onClick={() => navigate('/radiologist')} // Navigate to Radiologist Dashboard
          style={{
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
          }}
        >
          <BarChart size={20} className='text-white' />
          {isExpanded && <span>Radiologist Dashboard</span>}
        </div>

        {/* Train Model */}
        <div
          className={`flex items-center gap-4 bg-black p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all ease-in-out ${
            isExpanded ? 'w-full' : 'w-12'
          } cursor-pointer`}
          onClick={() => setActiveScreen('TrainModel')}
          style={{
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
          }}
        >
          <Settings size={20} className='text-white' />
          {isExpanded && <span>Train Model</span>}
        </div>

        {/* Unauthorized Hospitals */}
        <div
          className={`flex items-center gap-4 bg-black p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all ease-in-out ${
            isExpanded ? 'w-full' : 'w-12'
          } cursor-pointer`}
          onClick={() => setActiveScreen('UnauthorizedHospitals')}
          style={{
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
          }}
        >
          <AlertTriangle size={20} className='text-white' />
          {isExpanded && <span>Unauthorized Hospitals</span>}
        </div>

        {/* Registered Hospitals */}
        <div
          className={`flex items-center gap-4 bg-black p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all ease-in-out ${
            isExpanded ? 'w-full' : 'w-12'
          } cursor-pointer`}
          onClick={() => setActiveScreen('RegisteredHospitals')}
          style={{
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
          }}
        >
          <Database size={20} className='text-white' />
          {isExpanded && <span>Registered Hospitals</span>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
