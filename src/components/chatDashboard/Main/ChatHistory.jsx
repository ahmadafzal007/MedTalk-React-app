// ChatHistory.jsx
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCopy } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';

const ChatHistory = ({ chatHistory, isGenerating, isPending }) => {
 

  const [typedResponse, setTypedResponse] = useState('');
  const chatContainerRef = useRef(null); // Ref for the chat container

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log('file -> ', file)
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
      console.log('File selected:', file)
    } else {
      console.error('No file selected')
    }
  }

  const handleCopy = (text) => {
    const plainText = text.replace(/\*\*(.*?)\*\*/g, '$1');
    navigator.clipboard
      .writeText(plainText)
      .then(() => {
        console.log('Copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  useEffect(() => {
    // Apply typing effect only if generating a new response
    if ((isGenerating || isPending) && chatHistory.length > 0) {
      const lastMessageIndex = chatHistory.length - 1;
      const response = chatHistory[lastMessageIndex]?.response || '';
      let charIndex = 0;

      setTypedResponse(''); // Reset typed response

      const intervalId = setInterval(() => {
        if (charIndex < response.length) {
          setTypedResponse((prev) => prev + response.charAt(charIndex));
          charIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 8); // Adjust typing speed here

      return () => clearInterval(intervalId);
    } else {
      // Ensure the typed response is set when not generating
      if (chatHistory.length > 0) {
        const lastMessageIndex = chatHistory.length - 1;
        const response = chatHistory[lastMessageIndex]?.response || '';
        setTypedResponse(response);
      }
    }
  }, [chatHistory, isGenerating, isPending]);

  // Scroll to bottom when the chat history changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Log the chat history for debugging
  useEffect(() => {
    console.log('ChatHistory updated:', chatHistory);
  }, [chatHistory]);

  return (
    <section
      ref={chatContainerRef}
      className="h-[470px]  font-poppins md:h-[580px] lg:w-[1100px] md:w-[700px] w-[360px] overflow-y-auto scrollbar-hide"
    >
      {chatHistory.map(({ prompt, response, plot_url, image_url, image_local_preview }, index) => (
        <div key={index} className="mb-4">
          {/* User's prompt */}
          <div className="flex flex-row-reverse justify-start items-start animate-fadeIn gap-2">
            {/* Prompt logo (on the right) */}
            <div className="flex items-center justify-center h-5 w-5 md:h-5 md:w-5 rounded-full bg-[#151518] border border-gray-600 ">
              <FontAwesomeIcon icon={faUserCircle} className="text-gray-300" size="sm" />
            </div>
            {/* Prompt content */}
              {/* Display image at the top with consistent size */}
            <div className="max-w-[75%] bg-[#151518] border border-gray-600 p-2 rounded-lg shadow-md text-right text-xs">
              {image_url ? (
                <div className="mb-2">
                  <img
                    src={image_url}
                    alt="Uploaded"
                    className="w-full max-h-[280px] object-contain rounded-lg shadow-md"
                  />
                </div>
              ) : image_local_preview ? (
                <div className="mb-2">
                  <img
                    src={image_local_preview}
                    alt="Preview"
                    className="w-full max-h-[200px] object-contain rounded-lg shadow-md"
                  />
                </div>
              ) : null}

              <p className="text-gray-300">{prompt}</p>
            </div>
          </div>

          {/* AI's response */}
          <div
            className={`flex justify-start items-start animate-fadeInWithTyping mt-2 gap-2 ${
              index === chatHistory.length - 1 && (isPending || isGenerating) ? 'animate-pulse' : ''
            }`}
          >
            <div className="flex items-center justify-center h-5 w-5 md:h-5 md:w-5 rounded-full bg-[#151518] border border-gray-600">
              <img
                className={`w-4 min-w-4 md:w-3 md:min-w-3 transition-transform duration-500 ${
                  index === chatHistory.length - 1 && (isPending || isGenerating) ? 'animate-pulse' : ''
                }`}
                src="/medtalk-circle.png"
                alt="medtalk icon"
                style={{
                  filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
                }}
              />
            </div>

            {/* Render plot image (if available) and response */}
            <div className="max-w-[80%] p-2 rounded-lg shadow-md relative">
              {/* Copy button */}
              <button
                className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 rounded p-1"
                onClick={() => handleCopy(response)}
              >
                <FontAwesomeIcon icon={faCopy} size="sm" />
              </button>

              <div className="text-gray-300 text-xs font-poppins leading-relaxed">
                {/* If plot_url exists, show the plot image */}
                {plot_url && (
                  <div className="mb-2">
                    <img
                      src={plot_url}
                      alt="Plot"
                      className="max-w-full max-h-[200px] bg-white object-contain rounded-lg shadow-md"
                    />
                  </div>
                )}

                {index === chatHistory.length - 1 && (isGenerating || isPending) ? (
                  // Show typing effect for the last message during generation
                  <ReactMarkdown>{typedResponse}</ReactMarkdown>
                ) : (
                  // Show full response for previous messages
                  <ReactMarkdown>{response}</ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Invisible div to keep track of the bottom of the chat */}
      <div />
    </section>
  );
};

export default ChatHistory;
