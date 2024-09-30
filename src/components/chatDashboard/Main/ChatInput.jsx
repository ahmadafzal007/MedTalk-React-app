// ChatInput.jsx
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperclip,
  faPaperPlane,
  faTimes,
  faPrint,
  faFileCsv,
  faImage,
} from '@fortawesome/free-solid-svg-icons';

const ChatInput = ({
  prompt,
  setPrompt,
  setPreview,
  handleSendPrompt,
  isGenerating,
  setShowPDFForm,
  image,
  setImage,
  csv,
  setCsv,
}) => {
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);
  const [selectedCsvName, setSelectedCsvName] = useState(null);

  const imageInputRef = useRef(null);
  const csvInputRef = useRef(null);
  const inputRef = useRef(null);

  const [imagee, setImagee] = useState(null)
  const [url, setUrl] = useState('')
  // const [preview, setPreview] = useState('')


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Focus the text input field after each render
  useEffect(() => {
    if (!isGenerating && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isGenerating]);

  // Trigger image file input when the image icon is clicked
  const handleImageIconClick = () => {
    setIsMenuOpen(false);
    imageInputRef.current.click();
  };

  // Trigger CSV file input when the CSV icon is clicked
  const handleCsvIconClick = () => {
    setIsMenuOpen(false);
    csvInputRef.current.click();
  };

  const handleShowImageChange = (e) => {
    const file = e.target.files[0]
    console.log('file -> ', file)
    if (file) {
      setImagee(file)
      setPreview(URL.createObjectURL(file))
      console.log('File selected:', file)
    } else {
      console.error('No file selected')
    }
  }
  // File upload handler for image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      console.log('Image file selected:', file);
      // Clear any existing CSV file
      setCsv(null);
      setSelectedCsvName(null);
      if (csvInputRef.current) {
        csvInputRef.current.value = null;
      }

      setImage(file); // Set the image in Main component
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('Selected image preview:', reader.result);
        setSelectedImagePreview(reader.result); // For preview
      };
      reader.readAsDataURL(file);
    }
  };

  // File upload handler for CSV
  const handleCsvChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'text/csv' || file.name.endsWith('.csv'))) {
      console.log('CSV file selected:', file);
      // Clear any existing image file
      setImage(null);
      setSelectedImagePreview(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = null;
      }

      setCsv(file); // Set the CSV in Main component
      setSelectedCsvName(file.name); // For display
    }
  };

  // Remove the uploaded image
  const handleRemoveImage = () => {
    setImage(null);
    setSelectedImagePreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = null;
    }
  };

  // Remove the uploaded CSV
  const handleRemoveCsv = () => {
    setCsv(null);
    setSelectedCsvName(null);
    if (csvInputRef.current) {
      csvInputRef.current.value = null;
    }
  };

  // Handle prompt submission and clear inputs
  const handleSubmitPrompt = () => {
    console.log('Submitting prompt with image preview:', selectedImagePreview);
    console.log("image going to model: ", image)
    handleSendPrompt(prompt, image, csv, selectedImagePreview ); // Pass selectedImagePreview
    // Clear prompt and files
    setPrompt('');
    handleRemoveImage();
    handleRemoveCsv();
  };

  return (
    <div className='absolute mb-16 font-poppins md:pb-0 sm:mb-0 bottom-0 left-0 flex flex-col items-center bg-black right-0 mx-auto max-w-screen px-4 py-0 md:px-6 md:py-4 backdrop-blur-sm'>
      <div className='flex justify-center items-center gap-x-2'>
        <div className='flex items-center justify-between gap-3 rounded-lg xl:max-w-[600px] md:max-w-[400px] max-w-[400px] bg-black border border-gray-600 px-4 py-2 lg:px-5 lg:py-3 shadow-lg relative'>
          {/* Single Upload Icon */}
          <div className='cursor-pointer relative' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FontAwesomeIcon icon={faPaperclip} className='text-white text-xl' />
            {/* Show menu when isMenuOpen is true */}
            {isMenuOpen && (
              <div className='absolute left-0 bottom-full mb-4 bg-black border border-gray-700 rounded-md shadow-lg z-10 p-2'>
                <button
                  className='absolute border-0 top-0 right-0 text-white p-1'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faTimes} size='sm' />
                </button>
                <div className='flex space-x-0'>
                  <div
                    className='cursor-pointer flex flex-col rounded-lg hover:border hover:border-gray-700 p-2 mt-2 items-center'
                    onClick={handleImageIconClick}
                  >
                    <FontAwesomeIcon icon={faImage} className='text-white text-md' />
                    <span className='text-white text-[8px] mt-1'>Image</span>
                  </div>
                  <div
                    className='cursor-pointer flex flex-col rounded-lg hover:border hover:border-gray-700 p-2 ml-4 mt-2 items-center'
                    onClick={handleCsvIconClick}
                  >
                    <FontAwesomeIcon icon={faFileCsv} className='text-white text-md' />
                    <span className='text-white text-[8px] mt-1'>CSV</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <input
            type='file'
            accept='image/*'
            ref={imageInputRef}
            style={{ display: 'none' }}
            onChange={(e)=> {
              handleImageChange(e);
              handleShowImageChange(e);
            }}
          />
          <input
            type='file'
            accept='.csv,text/csv'
            ref={csvInputRef}
            style={{ display: 'none' }}
            onChange={handleCsvChange}
          />

          {/* Display Uploaded Image Preview */}
          {selectedImagePreview && (
            <div className='relative w-12 h-12 rounded-md overflow-hidden'>
              <img
                src={selectedImagePreview}
                alt='Preview'
                className='object-cover w-full h-full'
              />
              {/* X icon to remove the image */}
              <button
                className='absolute top-1 right-1 bg-opacity-60 text-white rounded-full p-1'
                onClick={handleRemoveImage}
              >
                <FontAwesomeIcon icon={faTimes} size='sm' />
              </button>
            </div>
          )}

          {/* Display Selected CSV File Name */}
          {selectedCsvName && (
            <div className='relative flex items-center bg-black border border-white px-2 py-1 rounded-md'>
              <FontAwesomeIcon icon={faFileCsv} className='text-white  mr-2' />
              <span className='text-white text-sm'>{selectedCsvName}</span>
              {/* X icon to remove the CSV */}
              <button
                className='ml-2 text-white rounded-full p-1'
                onClick={handleRemoveCsv}
              >
                <FontAwesomeIcon icon={faTimes} size='sm' />
              </button>
            </div>
          )}

          {/* Input Field for Text */}
          <input
            ref={inputRef}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission
                handleSubmitPrompt();
              }
            }}
            className='flex-1 ml-2 text-white w-[200px] md:w-[400px] lg:w-[600px] md:h-[30px] border-none bg-transparent font-normal text-sm outline-none'
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
              onClick={handleSubmitPrompt}
              className='cursor-pointer'
              style={{
                filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
              }}
            />
          </div>
        </div>

        {/* Print Button */}
        <div className=''>
          <button
            className='bg-black border border-gray-600 text-white lg:py-4 lg:px-4 px-3 py-3 rounded-lg flex items-center hover:bg-[#1e1e22] transition duration-300 shadow-lg'
            onClick={() => setShowPDFForm(true)} // Show the modal with the form
          >
            <FontAwesomeIcon icon={faPrint} className='text-white text-xl' />
          </button>
        </div>
      </div>

      <p className='mt-2 mb-1 w-[300px] md:w-[400px] lg:w-[600px] md:ml-4 text-center md:text-[9px] text-[8px] text-gray-300'>
        MedTalk may display inaccurate info, including about diagnosis, so if you are using it as a patient, must refer to your doctor.
      </p>
    </div>
  );
};

export default ChatInput;
