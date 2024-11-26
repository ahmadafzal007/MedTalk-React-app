import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { UserPlus, Hospital, Layers, Settings } from 'lucide-react';

// Register the necessary Chart.js components
Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const DashboardOverview = ({ setActiveScreen }) => {
  // Sample data for the graph
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Hospitals Registered',
        backgroundColor: 'rgba(255, 119, 111, 0.5)',
        borderColor: '#FF776F',
        fill: true,
        data: [10, 15, 8, 45, 12, 30],
      },
      {
        label: 'Radiologists Registered',
        backgroundColor: 'rgba(125, 219, 120, 0.5)',
        borderColor: '#7ADB78',
        fill: true,
        data: [5, 8, 12, 20, 9, 15],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Adjust grid color for dark theme
        },
        ticks: {
          color: 'white', // Change tick color
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Adjust grid color for dark theme
        },
        ticks: {
          color: 'white', // Change tick color
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white', // Change legend text color
        },
      },
    },
  };

  return (
    <div className="p-8 bg-black min-h-screen">
      <div className="text-4xl font-bold text-white mb-4">H<span className='font-normal'>ello,</span> A<span className='font-normal'>dmin</span>!</div>

      {/* Icons linking to different dashboard functionalities */}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          className="hover:bg-[#1e1e22] border border-gray-700 p-4 rounded-lg flex items-center cursor-pointer transition-colors"
          onClick={() => setActiveScreen('RegisterHospital')}
        >
          <UserPlus size={20} className="mr-3 text-white" />
          <span className="text-xs font-normal">Register Hospital</span>
        </div>

        <div
          className="hover:bg-[#1e1e22] p-4 border border-gray-700 rounded-lg flex items-center cursor-pointer transition-colors"
          onClick={() => setActiveScreen('ApproveHospitals')}
        >
          <Hospital size={20} className="mr-3 text-white" />
          <span className="text-xs font-normal">Approve Hospitals</span>
        </div>

        <div
          className="hover:bg-[#1e1e22] p-4 border border-gray-700 rounded-lg flex items-center cursor-pointer transition-colors"
          onClick={() => setActiveScreen('Datasets')}
        >
          <Layers size={20} className="mr-3 text-white" />
          <span className="text-xs font-normal">Datasets</span>
        </div>

        <div
          className="hover:bg-[#1e1e22] p-4 border border-gray-700 rounded-lg flex items-center cursor-pointer transition-colors"
          onClick={() => setActiveScreen('UnprocessedDatasets')}
        >
          <Settings size={20} className="mr-3 text-white" />
          <span className="text-xs font-normal">Unprocessed Datasets</span>
        </div>
      </div>

      {/* Line Chart for Monthly Statistics */}
      <div className="mt-6">
        <h2 className="text-lg font-poppins font-semibold ml-1 text-white mb-3">Monthly Statistics</h2>
        <div className="bg-black p-6 rounded-lg shadow-lg">
          <Line data={lineData} options={options} width={900} height={400} /> {/* Set width and height here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
