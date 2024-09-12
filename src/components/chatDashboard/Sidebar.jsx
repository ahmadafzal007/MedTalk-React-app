import { useContext, useState } from 'react'
import ChatContext from '../../providers/ChatsContext'
import SidebarToggle from './sidebar/SidebarToggle'
import NewChatButton from './sidebar/NewChatButton'
import SearchBar from './sidebar/SearchBar'
import RecentChats from './sidebar/RecentChats'
import AddPatientButton from './sidebar/AddPatientButton'
import ViewPatientsButton from './sidebar/ViewPatientsButton'
import SidebarMenuItems from './sidebar/SidebarMenuItems'

const Sidebar = ({ setShowForm, setShowViewPatients }) => {
  const { startNewChat, isGenerating } = useContext(ChatContext)
  const [isExpanded, setIsExpanded] = useState(true)
  const [recentChats, setRecentChats] = useState([]) // Track recent chats
  const [chatCounter, setChatCounter] = useState(1) // Counter for naming chats

  const toggleSidebarExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  const handleNewChat = () => {
    startNewChat() // Start a fresh new chat
    setShowForm(false) // Ensure the form is hidden when starting a new chat
    setShowViewPatients(false) // Ensure the View Patients list is hidden when starting a new chat

    // Update recent chats list (keep only the 3 most recent chats)
    setRecentChats((prevChats) => {
      const updatedChats = [
        ...prevChats,
        { name: `New Chat ${chatCounter}`, id: chatCounter },
      ]
      // Keep only the last 3 chats
      if (updatedChats.length > 3) {
        updatedChats.shift() // Remove the oldest chat (first one)
      }
      return updatedChats
    })

    // Increment chat counter for unique naming
    setChatCounter((prevCounter) => prevCounter + 1)
  }

  const handleAddPatient = () => {
    setShowForm(true) // Show Add Patient Form
    setShowViewPatients(false) // Ensure View Patients is hidden
  }

  const handleViewPatients = () => {
    setShowViewPatients(true) // Show View Patients
    setShowForm(false) // Ensure Add Patient Form is hidden
  }

  return (
    <div
      className={`hidden z-3 font-inconsolata h-screen flex-col justify-between bg-[#131314] text-white px-4 py-6 sm:inline-flex backdrop-blur-lg shadow-xl transform transition-all ${
        isExpanded ? 'w-60' : 'w-[4.75rem]'
      }`}
      style={{
        boxShadow:
          'inset 0 0 15px rgba(255, 255, 255, 0.1), 0 4px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
        transitionDuration: '400ms',
        transitionTimingFunction: 'ease-in-out',
      }}
    >
      <div>
        {/* Toggle Sidebar */}
        <SidebarToggle toggleSidebarExpand={toggleSidebarExpand} />
        {/* New Chat Button */}
        <NewChatButton
          isGenerating={isGenerating}
          handleNewChat={handleNewChat} // Reset everything when starting a new chat
          isExpanded={isExpanded}
        />
        {/* Search Bar */}
        <SearchBar isExpanded={isExpanded} />
        {/* Add Patient Button */}
        <AddPatientButton
          isExpanded={isExpanded}
          setShowForm={handleAddPatient}
        />
        {/* View Patients Button */}
        <ViewPatientsButton
          isExpanded={isExpanded}
          setShowViewPatients={handleViewPatients} // Update handler
        />
        {/* Recent Chats */}
        {isExpanded && (
          <RecentChats
            chats={recentChats} // Pass the recent chats
            handleChatClick={() => {
              setShowForm(false)
              setShowViewPatients(false)
            }} // Hide form and view patients when selecting an old chat
            isGenerating={isGenerating}
          />
        )}
      </div>
      {/* Sidebar Menu Items */}
      <SidebarMenuItems isExpanded={isExpanded} />
    </div>
  )
}

export default Sidebar
