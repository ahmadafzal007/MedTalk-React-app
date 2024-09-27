import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const ChatHistory = ({ chatHistory, isGenerating, isPending }) => {
  const [typedResponses, setTypedResponses] = useState([]);
  const chatEndRef = useRef(null); // Ref to track the bottom of the chat

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

              // Check if the newly added character causes a line break
              const newResponse = updatedResponses[index].response;
              const div = document.createElement('div');
              div.style.visibility = 'hidden';
              div.style.position = 'absolute';
              div.style.width = 'auto'; // Match your chat width
              div.innerHTML = newResponse;
              document.body.appendChild(div);

              // Calculate line count based on the new response
              const lineCount = div.clientHeight / parseFloat(getComputedStyle(div).lineHeight);
              document.body.removeChild(div);

              // If the new character causes an additional line, scroll to the bottom
              if (lineCount > Math.floor((chatEndRef.current.clientHeight / parseFloat(getComputedStyle(chatEndRef.current).lineHeight)))) {
                chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
              }

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

  // Scroll to bottom when the chat history changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [typedResponses]);

  return (
    <section className="h-[470px] font-poppins md:h-[480px] lg:w-[1100px] md:w-[700px] w-[360px] overflow-y-auto scrollbar-hide">
      {chatHistory.map(({ prompt, response }, index) => (
        <div key={index} className="mb-4">
          {/* User's prompt */}
          <div className="flex flex-row-reverse justify-start items-start animate-fadeIn gap-2">
            {/* Prompt logo (on the right) */}
            <div className="flex items-center justify-center h-7 w-7 md:h-9 md:w-9 rounded-full bg-[#151518] border border-gray-600 ">
              <FontAwesomeIcon icon={faUserCircle} className="text-gray-300" size="lg" />
            </div>
            {/* Prompt content */}
            <div className="max-w-[75%] bg-[#151518] border border-gray-600 p-2 rounded-lg shadow-md text-right text-xs">
              <p className="text-gray-300">{prompt}</p>
            </div>
          </div>

          {/* AI's response */}
          <div
            className={`flex justify-start items-start animate-fadeInWithTyping mt-2 gap-2 ${
              isPending || isGenerating ? 'animate-pulse' : ''
            }`}
          >
            <div className="flex items-center justify-center h-7 w-7 md:h-9 md:w-9 rounded-full bg-[#151518] border border-gray-600">
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
            <div className="max-w-[80%] border bg-[#151518] border-gray-600 p-2 rounded-lg shadow-md">
              <p
                className="text-gray-300 text-xs font-poppins leading-relaxed"
                dangerouslySetInnerHTML={{ __html: typedResponses[index]?.response }}
              />
            </div>
          </div>
        </div>
      ))}
      {/* Invisible div to keep track of the bottom of the chat */}
      <div ref={chatEndRef} />
    </section>
  );
};

export default ChatHistory;
