import React from 'react'

const ConfirmationModal = ({ message, onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg text-center'>
        <h2 className='text-2xl font-bold text-white mb-4'>Success</h2>
        <p className='text-gray-300 mb-6'>{message}</p>
        <button
          onClick={onClose}
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg'
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal
