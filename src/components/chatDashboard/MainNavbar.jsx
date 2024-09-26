import { useState } from 'react'
import { ChevronDown, UserRound } from 'lucide-react' // Import icons

const MainNavbar = ({ setShowPDFForm }) => {
  const [isOpen, setIsOpen] = useState(false) // For dropdown menu

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className='flex bg-[#151518] items-center justify-between px-4 py-3 md:px-6 md:py-4 text-base  border border-l-0 border-gray-600'>
      <div className='relative'>
        <button
          onClick={toggleDropdown}
          className='text-sm p-2 font-poppins text-white flex items-center gap-2'
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
                className='cursor-pointer text-sm font-poppins px-4 py-2 bg-[#131314] hover:bg-[#131314] rounded-lg'
                onClick={() => alert('MedTalk Pro')}
              >
                MedTalk Rag   
               (coming soon)
              </li>
            </ul>
          </div>
        )}
      </div>
      <div>
        <ul className='flex items-center gap-2 md:gap-3 text-sm md:text-lg '>
          <li>
            <button className='hidden p-2 font-poppins text-sm md:block md:mr-4'>
              Talk to MedX
            </button>
          </li>
          <li className='flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full bg-black border border-gray-600 shadow-md'>
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
  )
}

export default MainNavbar
