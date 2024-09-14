import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js' // Import required components from Chart.js
import { UserPlus, Hospital, Layers, Settings } from 'lucide-react' // Icons

// Register the necessary Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const DashboardOverview = ({ setActiveScreen }) => {
  // Sample data for the graph
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Hospitals Registered',
        backgroundColor: '#FF776F',
        data: [10, 15, 8, 25, 12, 30],
      },
      {
        label: 'Radiologists Registered',
        backgroundColor: '#7ADB78',
        data: [5, 8, 12, 20, 9, 15],
      },
    ],
  }

  const options = {
    scales: {
      y: { beginAtZero: true },
    },
  }

  return (
    <div className='p-8'>
      <h1 className='text-4xl font-bold text-white mb-8'>Hello, Admin!</h1>

      {/* Icons linking to different dashboard functionalities */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <div
          className='bg-gray-800 p-6 rounded-lg shadow-lg text-white cursor-pointer hover:bg-gray-700'
          onClick={() => setActiveScreen('RegisterHospital')}
        >
          <div className='flex items-center justify-center'>
            <Hospital size={40} className='text-white' />
          </div>
          <h3 className='text-xl text-center font-bold mt-4'>
            Registered Hospitals
          </h3>
        </div>

        <div
          className='bg-gray-800 p-6 rounded-lg shadow-lg text-white cursor-pointer hover:bg-gray-700'
          onClick={() => setActiveScreen('RegisterRadiologist')}
        >
          <div className='flex items-center justify-center'>
            <UserPlus size={40} className='text-white' />
          </div>
          <h3 className='text-xl text-center font-bold mt-4'>
            Registered Radiologists
          </h3>
        </div>

        <div
          className='bg-gray-800 p-6 rounded-lg shadow-lg text-white cursor-pointer hover:bg-gray-700'
          onClick={() => setActiveScreen('Datasets')}
        >
          <div className='flex items-center justify-center'>
            <Layers size={40} className='text-white' />
          </div>
          <h3 className='text-xl text-center font-bold mt-4'>Datasets</h3>
        </div>

        <div
          className='bg-gray-800 p-6 rounded-lg shadow-lg text-white cursor-pointer hover:bg-gray-700'
          onClick={() => setActiveScreen('TrainModel')}
        >
          <div className='flex items-center justify-center'>
            <Settings size={40} className='text-white' />
          </div>
          <h3 className='text-xl text-center font-bold mt-4'>Train Model</h3>
        </div>
      </div>

      {/* Placeholder Bar Chart for Random Stats */}
      <div className='mt-10'>
        <h2 className='text-2xl font-bold text-white mb-6'>
          Monthly Statistics
        </h2>
        <div className='bg-gray-800 p-6 rounded-lg shadow-lg'>
          <Bar data={barData} options={options} />
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview
