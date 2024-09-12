import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaperclip,
  faPaperPlane,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

const ChatInput = ({ prompt, setPrompt, handleSendPrompt, isGenerating }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const fileInputRef = useRef(null) // Reference for the hidden file input
  const inputRef = useRef(null) // Reference for the text input field

  // Focus the text input field after each render
  useEffect(() => {
    if (!isGenerating && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isGenerating, selectedImage])

  // Trigger file input when the clip icon is clicked
  const handleIconClick = () => {
    fileInputRef.current.click() // Opens the file input dialog
  }

  // File upload handler
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove the uploaded image
  const handleRemoveImage = () => {
    setSelectedImage(null)
  }

  return (
    <div className='absolute mb-12 md:mb-0 bottom-0 left-0 flex flex-col items-center bg-black right-0 mx-auto max-w-screen px-4 py-3 md:px-6 md:py-4 backdrop-blur-sm'>
      <div
        className='flex items-center justify-between gap-3 rounded-full max-w-[800px] bg-[#131314] px-4 py-2 md:px-5 md:py-3 shadow-lg'
        style={{
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)', // Border glow effect
        }}
      >
        {/* Paperclip Icon for File Upload */}
        <div className='cursor-pointer relative' onClick={handleIconClick}>
          <FontAwesomeIcon icon={faPaperclip} className='text-white text-xl' />
        </div>
        <input
          type='file'
          accept='image/*'
          ref={fileInputRef} // Attach the ref to the hidden file input
          style={{ display: 'none' }} // Hide the file input
          onChange={handleFileChange} // File upload handler
        />

        {/* Display Uploaded Image Preview (only if image is selected) */}
        {selectedImage && (
          <div className='relative w-12 h-12 rounded-md overflow-hidden'>
            <img
              src={selectedImage}
              alt='Preview'
              className='object-cover w-full h-full'
            />
            {/* X icon to remove the image */}
            <button
              className='absolute top-0 right-0 bg-black bg-opacity-60 text-white rounded-full p-0.5'
              onClick={handleRemoveImage}
              style={{
                transform: 'translate(50%, -50%)', // Align the button slightly outside the top-right corner
              }}
            >
              <FontAwesomeIcon icon={faTimes} size='xs' />
            </button>
          </div>
        )}

        {/* Input Field for Text */}
        <input
          ref={inputRef} // Attach the ref to the input field
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
          className='flex-1 text-white w-[300px] md:w-[400px] lg:w-[600px] md:h-[30px] border-none bg-transparent font-thin outline-none'
          type='text'
          placeholder='Enter a prompt here'
          value={prompt}
          disabled={isGenerating}
        />

        {/* Send Button */}
        <div className='flex items-center gap-2 text-gray-300'>
          <FontAwesomeIcon
            icon={faPaperPlane}
            size='lg'
            onClick={handleSendPrompt}
            style={{
              filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
            }}
          />
        </div>
      </div>

      <p className='mt-3 w-[300px] md:w-[400px] lg:w-[600px] font-thin md:ml-4 text-center text-xs font-light text-gray-300'>
        MedTalk may display inaccurate info, including about diagnosis, so if
        you are using it as a patient, must refer to your doctor.
      </p>
    </div>
  )
}

export default ChatInput
