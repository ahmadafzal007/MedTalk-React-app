import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const ChatHistory = ({ chatHistory, isGenerating, isPending }) => {
  const [typedResponses, setTypedResponses] = useState([]);

  useEffect(() => {
    setTypedResponses((prevResponses) => {
      const updatedResponses = chatHistory.map(({ response }, index) => {
        if (prevResponses[index]) {
          return prevResponses[index]; // Keep existing typed responses
        } else {
          return { response: '', fullResponse: response || '' }; // Initialize new responses
        }
      });
      return updatedResponses;
    });

    chatHistory.forEach((entry, index) => {
      if (
        entry.response &&
        (!typedResponses[index] || typedResponses[index].response.length < entry.response.length)
      ) {
        let charIndex = typedResponses[index]?.response.length || 0;

        const intervalId = setInterval(() => {
          if (charIndex < entry.response.length) {
            setTypedResponses((prevResponses) => {
              const updatedResponses = [...prevResponses];
              updatedResponses[index].response += entry.response[charIndex];
              return updatedResponses;
            });
            charIndex++;
          } else {
            clearInterval(intervalId); // Clear interval when done typing
          }
        }, 8); // Adjust typing speed here
      }
    });
  }, [chatHistory]);

  return (
    <section className="h-[550px] font-poppins md:h-[480px] lg:w-[1100px] md:w-[700px] w-[360px] overflow-hidden overflow-y-auto scrollbar-hide">
      {chatHistory.map(({ prompt, response }, index) => (
        <div key={index} className="mb-4">
          {/* User's prompt */}
          <div className="flex flex-row-reverse justify-start items-start animate-fadeIn gap-2">
            {/* Prompt logo (on the right) */}
            <div className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full ">
              <FontAwesomeIcon icon={faUserCircle} className="text-gray-300" size="lg" />
            </div>
            {/* Prompt content */}
            <div className="max-w-[75%] bg-black border border-gray-600 p-2 rounded-full shadow-md text-right text-xs">
              <p className="text-gray-300">{prompt}</p>
            </div>
          </div>

          {/* AI's response */}
          <div
            className={`flex justify-start items-start animate-fadeInWithTyping mt-2 gap-2 ${
              isPending || isGenerating ? 'animate-pulse' : ''
            }`}
          >
            <div className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full bg-black">
              <img
                className={`w-4 min-w-4 md:w-5 md:min-w-5 transition-transform duration-500 ${
                  isPending || isGenerating ? 'animate-pulse' : ''
                }`}
                src="/medtalk-circle.png"
                alt="gemini icon"
                style={{
                  filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
                }}
              />
            </div>

            {/* Render response with HTML formatting */}
            <div className="max-w-[100%] bg-black border border-gray-600 p-3 rounded-lg shadow-md">
              <p
                className="text-gray-300 text-xs font-poppins leading-relaxed"
                dangerouslySetInnerHTML={{ __html: typedResponses[index]?.response }}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ChatHistory;
