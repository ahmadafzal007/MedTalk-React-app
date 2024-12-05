import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import {
  faPills,
  faHeartbeat,
  faStethoscope,
  faThermometerHalf,
} from '@fortawesome/free-solid-svg-icons';

const HelpSection = ({ hasMessages , isExpanded}) => {
  const [ isSidebarExpanded, setIsSidebarExpanded ] = useState();
  useEffect(() => {
    setIsSidebarExpanded(localStorage.getItem('isExpanded'))
    console.log(localStorage.getItem('isExpanded'));
  }, [isSidebarExpanded]);
  if (hasMessages) return null;

  const options = [
    {
      label: 'Explain the mechanism of a common medication',
      Icon: faPills,
    },
    {
      label: 'Give advice on managing a chronic condition',
      Icon: faHeartbeat,
    },
    {
      label: 'Outline the steps for a basic medical procedure',
      Icon: faStethoscope,
    },
    {
      label: 'Provide tips for measuring and recording vital signs',
      Icon: faThermometerHalf,
    },
  ];

  return (
    <div
      className={`max-h-screen  mt-20 md:mt-24 lg:mt-28 flex flex-col justify-center items-center transition-all  ${
        isSidebarExpanded ? '' : '' // Adjust margin based on sidebar expansion
      }`}
    >
      {/* Logo centered above the card options */}
      {/* <div className='mb-8'>
        <img
          src='/medtalk-circle.png'
          alt='MedTalk Logo'
          className='w-10 h-10 md:w-20 md:h-20 object-contain mb-8'
        />
      </div>

      <div className='flex flex-col items-center'>
        <div className='grid grid-cols-2 gap-4'>
          {options.map(({ label, Icon }, idx) => (
            <div
              className='relative h-28 md:h-24 md:w-76 font-poppins text-xs cursor-pointer  rounded-lg border border-gray-600 from-gray-700 via-gray-800 to-gray-900 backdrop-blur-lg shadow-xl transform transition-all p-4 text-white'
              key={idx}
            >
              <p className='text-gray-300'>{label}</p>
              <div className='absolute bottom-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 shadow-lg'>
                <FontAwesomeIcon
                  icon={Icon}
                  size='lg'
                  className='text-white'
                  style={{
                    filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default HelpSection;
