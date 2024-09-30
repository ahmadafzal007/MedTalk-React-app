import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatContext from '../../providers/ChatsContext';
import HelpSection from './Main/HelpSection';
import ChatHistory from './Main/ChatHistory';
import ChatInput from './Main/ChatInput';
import AddPatientForm from './AddPatientForm';
import ViewPatients from './ViewPatients';
import PrintReportForm from '../../Print/PrintReportForm';
import Navbar from './MainNavbar';

const Main = ({
  showForm,
  setShowForm,
  showViewPatients,
  setShowViewPatients,
  isExpanded,
}) => {
  const {
    sendPrompt,
    setPrompt,
    prompt,
    isPending,
    isGenerating,
    chatHistory,
    setPreview,
    startNewChat,
  } = useContext(ChatContext);

  const [showPDFForm, setShowPDFForm] = useState(false);

  // New state variables for image and csv files
  const [image, setImage] = useState(null);
  const [csv, setCsv] = useState(null);

  // Get chatId from the URL using useParams
  const params = useParams();
  const chatId = params.chatId;

  const handleSendPrompt = async () => {
    
    console.log('Sending prompttttttttttttttttttttttttttt');
    // Check if chatId exists, if not create one
    if (!chatId) {
      const newChat = await startNewChat(prompt, image, csv);
      console.log("new chat",newChat);
    }

    else if (prompt.trim()) {
      
      // Pass image and csv to sendPrompt
      await sendPrompt(prompt, image, csv);
    
      console.log('Sending prompttttt', prompt);
      // Reset image and csv after sending
      setImage(null);
      setCsv(null);
    }
  };

  const hasMessages = chatHistory && chatHistory.length > 0;

  return (
    <div className='md:relative relative w-full h-screen text-white'>
      <h1></h1>
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

      <main
        className={`flex-1 items-center justify-center overflow-y-auto px-4 py-5 md:px-6 md:py-8 ${
          isExpanded ? '' : ''
        }`}
      >
        <div className='flex items-center justify-center'>
          {/* Render HelpSection if no chat messages are present */}
          {!chatId && (
            <HelpSection hasMessages={false} isSidebarExpanded={isExpanded} />
          )}

          {/* Render chat messages when chat has started */}
          {!showForm && !showViewPatients && hasMessages && chatId && (
            <ChatHistory
              chatHistory={chatHistory}
              isPending={isPending}
              isGenerating={isGenerating}
            />
          )}

          {/* Show Add Patient Form */}
          {showForm && <AddPatientForm setShowForm={setShowForm} x />}

          {/* Show View Patients */}
          {showViewPatients && <ViewPatients />}

          {/* Chat Input Section */}
          {!showForm && !showViewPatients && (
            <ChatInput
              setPreview={setPreview}
              prompt={prompt}   
              setPrompt={setPrompt}
              handleSendPrompt={handleSendPrompt}
              isGenerating={isGenerating}
              setShowPDFForm={setShowPDFForm}
              image={image}
              setImage={setImage}
              csv={csv}
              setCsv={setCsv}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Main;
