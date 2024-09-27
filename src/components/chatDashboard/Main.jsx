import { useContext, useState } from 'react'
import ChatContext from '../../providers/ChatsContext'
import HelpSection from './Main/HelpSection'
import ChatHistory from './Main/ChatHistory'
import ChatInput from './Main/ChatInput'
import AddPatientForm from './AddPatientForm'
import ViewPatients from './ViewPatients'
import PrintReportForm from '../../Print/PrintReportForm'
import Navbar from './MainNavbar'

const Main = ({
  showForm,
  setShowForm,
  showViewPatients,
  isExpanded,
}) => {
  const {
    sendPrompt,
    setPrompt,
    prompt,
    isPending,
    isGenerating,
    chatHistory,
  } = useContext(ChatContext)

  const [showPDFForm, setShowPDFForm] = useState(false)

  const handleSendPrompt = () => {
    if (prompt.trim()) {
      sendPrompt(prompt)
    }
  }

  const hasMessages = chatHistory && chatHistory.length > 0

  return (
    <div className='md:relative relative  w-full h-screen bg-black text-white'>
      {/* Navigation Bar */}
      <Navbar setShowPDFForm={setShowPDFForm} />

      {/* Modal for Print Report Form */}
      {showPDFForm && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50'>
          <div className='relative bg-[#151518] mt-16 text-white p-8 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto border-2 border-gray-600 shadow-lg'>
            <button
              onClick={() => setShowPDFForm(false)}
              className='absolute top-4 p-2 px-4 right-4 text-gray-300 hover:text-white'
            >
              X {/* Close button */}
            </button>
            <PrintReportForm /> {/* Render the form */}
          </div>
        </div>
      )}

      <main className={`flex-1 items-center justify-center overflow-y-auto px-4 py-5 md:px-6 md:py-8 ${isExpanded ? "" : ""}`}>
        <div className='flex items-center justify-center'>
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
          <div>
            
          </div>
          {showViewPatients && <ViewPatients />}

          {/* Chat Input Section */}
          {!showForm && !showViewPatients && (
            <ChatInput
              prompt={prompt}
              setPrompt={setPrompt}
              handleSendPrompt={handleSendPrompt}
              isGenerating={isGenerating}
              setShowPDFForm={setShowPDFForm}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default Main
