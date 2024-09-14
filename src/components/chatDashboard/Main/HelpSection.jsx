import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPills,
  faHeartbeat,
  faStethoscope,
  faThermometerHalf,
} from '@fortawesome/free-solid-svg-icons'

const HelpSection = ({ hasMessages }) => {
  if (hasMessages) return null

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
  ]

  return (
    <section className='text-start'>
      <p className='text-3xl md:text-4xl font-semibold text-gray-400'>
        <div className='flex flex-col md:ml-28'>
          <span
            className='text-4xl text-start font-permanent font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 shadow-md'
            style={{
              backgroundImage:
                'linear-gradient(90deg, #d1d5db, #6b7280, #4b5563)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            }}
          >
            Hello, Researcher
          </span>
          <span
            className='text-3xl text-start font-permanent font-bold mb-12 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 shadow-md'
            style={{
              backgroundImage:
                'linear-gradient(90deg, #d1d5db, #6b7280, #4b5563)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            }}
          >
            How can I help you today?
          </span>
        </div>
      </p>

      <div className='absolute ml-24 pl-4 overflow-hidden scrollbar-hide hidden md:block'>
        <div className='flex font-thin items-center justify-center'>
          <div className=' lg:w-[770px] w-[550px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mb-20 mt-10'>
            {options.map(({ label, Icon }, idx) => (
              <div
                className='relative h-28 md:h-44 w-44 cursor-pointer text-xs rounded-xl from-gray-700 via-gray-800 to-gray-900 backdrop-blur-lg shadow-xl transform transition-all p-4 text-white'
                key={idx}
                style={{
                  boxShadow:
                    '0 0 10px rgba(255, 255, 255, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.5)',
                  transitionDuration: '400ms',
                }}
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
        </div>
      </div>
    </section>
  )
}

export default HelpSection
