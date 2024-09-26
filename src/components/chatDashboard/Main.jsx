import { useContext, useState } from 'react'
import ChatContext from '../../providers/ChatsContext'
import HelpSection from './Main/HelpSection'
import ChatHistory from './Main/ChatHistory'
import ChatInput from './Main/ChatInput'
import AddPatientForm from './AddPatientForm'
import ViewPatients from './ViewPatients'
import PrintReportForm from '../../Print/PrintReportForm' // Import the form instead of button
import Navbar from './MainNavbar' // Import the new Navbar component

const Main = ({
  showForm,
  setShowForm,
  showViewPatients,
  isExpanded, // Accept the isExpanded prop
}) => {
  const {
    sendPrompt,
    setPrompt,
    prompt,
    isPending,
    isGenerating,
    chatHistory,
  } = useContext(ChatContext)

  const [showPDFForm, setShowPDFForm] = useState(false) // State to control the PDF form modal

  const handleSendPrompt = () => {
    if (prompt.trim()) {
      sendPrompt(prompt)
    }
  }

  const hasMessages = chatHistory && chatHistory.length > 0

  return (
    <div className='md:relative relative font-inconsolata w-full h-screen bg-black text-white'>
      {/* Navigation Bar */}
      <Navbar setShowPDFForm={setShowPDFForm} />

      {/* Modal for Print Report Form */}
      {showPDFForm && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50'>
          <div className='relative bg-gray-900 text-white p-8 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto'>
            <button
              onClick={() => setShowPDFForm(false)}
              className='absolute top-4 right-4 text-gray-300 hover:text-white'
            >
              X {/* Close button */}
            </button>
            <PrintReportForm /> {/* Render the form */}
          </div>
        </div>
      )}

      <main className={`flex-1 items-center justify-center overflow-y-auto px-4 py-5 md:px-6 md:py-8 ${isExpanded ? "" : ""}`}>
        <div className=''>
          {/* Render HelpSection if no chat messages are present */}
          {!showForm && !showViewPatients && !hasMessages && (
            <HelpSection hasMessages={false} isSidebarExpanded={isExpanded} />
          )}

          {/* Render chat messages when chat has started */}
          {!showForm && !showViewPatients && hasMessages && (
            <ChatHistory
              chatHistory={chatHistory}
              isPending={isPending}
              isGenerating={isGenerating}
            />
          )}

          {/* Show Add Patient Form */}
          {showForm && <AddPatientForm setShowForm={setShowForm} />}

          {/* Show View Patients */}
          {showViewPatients && <ViewPatients />}


          
          {/* Chat Input Section */}
          {!showForm && !showViewPatients && (
            <ChatInput
              prompt={prompt}
              setPrompt={setPrompt}
              handleSendPrompt={handleSendPrompt}
              isGenerating={isGenerating}
            />
          )}

          
        </div>
      </main>
    </div>
  )
}

export default Main