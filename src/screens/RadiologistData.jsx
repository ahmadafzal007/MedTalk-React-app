import React, { useState } from 'react'
import RadiologistPageSidebar from '../components/Radiologist/RadiologistPageSidebar' // Adjust path as necessary
import RadiologistPage from '../components/Radiologist/RadiologistPage' // Adjust path as necessary

const RadiologistData = () => {
  const [currentFolder, setCurrentFolder] = useState(null) // To manage folder state

  // Handle folder selection in the sidebar
  const handleFolderSelection = (folder) => {
    setCurrentFolder(folder) // Update the selected folder
    console.log('Selected Folder:', folder) // Debug to ensure folder is selected correctly
  }

  return (
    <div className='flex bg-gray-900 min-h-screen'>
      {/* Sidebar */}
      <RadiologistPageSidebar onSelectFolder={handleFolderSelection} />

      {/* Main Content */}
      <div className='ml-64 flex-1 p-8'>
        <RadiologistPage selectedFolder={currentFolder} />
      </div>
    </div>
  )
}

export default RadiologistData
