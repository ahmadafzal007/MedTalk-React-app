import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const ChatHistory = ({ chatHistory, isGenerating, isPending }) => {
  return (
    <section className='h-[550px] font-poppins md:h-[380px] lg:w-[900px] md:w-[600px] w-[360px] overflow-hidden overflow-y-auto scrollbar-hide'>
      {chatHistory.map(({ prompt, response }, index) => (
        <div key={index} className='mb-4'>
          {/* Display the user's prompt with fadeIn animation */}
          <div className='flex items-center gap-4 animate-fadeIn'>
            <div className='flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full shadow-md'>
              <FontAwesomeIcon
                icon={faUserCircle}
                className='text-gray-300'
                size='lg'
              />
            </div>
            <p className='text-gray-300'>{prompt}</p>
          </div>

          {/* Display the typing effect or the response with fadeInWithTyping animation */}
          <div
            className={`flex items-start gap-4 mt-2 animate-fadeInWithTyping ${
              isPending || isGenerating ? 'animate-pulse' : ''
            }`}
          >
            <div className='flex items-center justify-center h-8 w-8 md:h-10 md:w-10'>
              <img
                className={`w-4 min-w-4 md:w-5 md:min-w-5  transition-transform duration-500 ${
                  isPending || isGenerating ? 'animate-pulse' : ''
                }`}
                src='/medtalk-circle.png'
                alt='gemini icon'
                style={{
                  filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
                }}
              />
            </div>
            <p
              className='text-gray-300 font-light leading-relaxed'
              dangerouslySetInnerHTML={{ __html: response }}
            />
          </div>
        </div>
      ))}
    </section>
  )
}

export default ChatHistory
