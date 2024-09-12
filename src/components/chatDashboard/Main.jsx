import { useContext, useState } from 'react'
import ChatContext from '../../providers/ChatsContext'
import HelpSection from './Main/HelpSection'
import ChatHistory from './Main/ChatHistory'
import ChatInput from './Main/ChatInput'
import AddPatientForm from './AddPatientForm'
import ViewPatients from './ViewPatients'
import PrintReportForm from '../../Print/PrintReportForm' // Import the form instead of button
import { ChevronDown, UserRound } from 'lucide-react' // Import icons

const Main = ({
  showForm,
  setShowForm,
  showViewPatients,
  setShowViewPatients,
}) => {
  const {
    sendPrompt,
    setPrompt,
    prompt,
    isPending,
    isGenerating,
    chatHistory,
  } = useContext(ChatContext)

  const [isOpen, setIsOpen] = useState(false) // For dropdown menu
  const [showPDFForm, setShowPDFForm] = useState(false) // State to control the PDF form modal

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSendPrompt = () => {
    if (prompt.trim()) {
      sendPrompt(prompt)
    }
  }

  const hasMessages = chatHistory && chatHistory.length > 0

  return (
    <div className='relative font-inconsolata w-full h-screen bg-black text-white'>
      {/* Navigation Bar */}
      <nav className='flex items-center justify-between px-4 py-3 md:px-6 md:py-4 text-base font-light'>
        <div className='relative'>
          <button
            onClick={toggleDropdown}
            className='text-base font-thin text-white flex items-center gap-2'
          >
            MedTalk
            <ChevronDown
              size={15}
              className={`transition-transform ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
          {isOpen && (
            <div className='absolute left-0 mt-2 w-48 bg-black text-white rounded-lg border-2 border-white shadow-lg'>
              <ul>
                <li
                  className='cursor-pointer text-sm px-4 py-2 bg-[#131314] hover:bg-[#131314] rounded-lg'
                  onClick={() => alert('MedTalk Pro')}
                >
                  MedTalk Pro
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <ul className='flex items-center gap-2 md:gap-3 text-sm md:text-lg font-bold'>
            <li>
              <button className='hidden font-thin md:block text-base md:mr-4'>
                Try MedTalk Pro
              </button>
            </li>
            <li className='flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-800 shadow-md'>
              <UserRound
                size={20}
                className='text-white'
                style={{
                  filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
                }}
              />
            </li>
          </ul>
        </div>
      </nav>

      {/* Only show the Generate PDF button if neither showForm nor showViewPatients is true */}
      {!showForm && !showViewPatients && (
        <div className='absolute right-4 top-20 md:top-28'>
          <button
            className='bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center hover:bg-gray-700 transition duration-300 shadow-lg'
            onClick={() => setShowPDFForm(true)} // Show the modal with the form
          >
            <span className='mr-2'>Generate PDF</span>
          </button>
        </div>
      )}

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

      <main className='flex-1 items-center justify-center overflow-y-auto px-4 py-5 md:px-6 md:py-8'>
        <div className='lg:w-[1000px] lg:ml-[140px]'>
          {/* Render HelpSection if no chat messages are present */}
          {!showForm && !showViewPatients && !hasMessages && (
            <HelpSection hasMessages={false} />
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
