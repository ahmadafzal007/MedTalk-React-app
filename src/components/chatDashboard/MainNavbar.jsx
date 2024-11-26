import { useState, useEffect, useRef } from 'react';
import { ChevronDown, UserRound } from 'lucide-react'; // Import icons
import { useNavigate } from 'react-router-dom'; // For navigation
import { useSelector, useDispatch } from 'react-redux'; // Import from react-redux
import { logout } from '../../redux/userSlice'; // Import your logout action

const MainNavbar = ({ setShowPDFForm }) => {
  const [isOpen, setIsOpen] = useState(false); // For MedTalk dropdown menu
  const [isProfileOpen, setIsProfileOpen] = useState(false); // For profile dropdown menu
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get user data from Redux store
  const user = useSelector((state) => state.user);
 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <nav className='flex bg-[#151518] items-center justify-between px-4 py-3 md:px-6 md:py-4 text-base border border-l-0 border-gray-600'>
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
                MedTalk Pro (coming soon)
              </li>
            </ul>
          </div>
        )}
      </div>
      <div>
        <ul className='flex items-center gap-2 md:gap-3 text-sm md:text-lg'>
          <li>
            <button
              onClick={() => navigate('/avatar')} // Redirects to the avatar route
              className='hidden p-2 font-poppins text-sm md:block md:mr-4'
            >
              Talk to MedX
            </button>
          </li>
          <li className='relative' ref={profileDropdownRef}>
            <button
              onClick={toggleProfileDropdown}
              className='flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full bg-black border border-gray-600 shadow-md overflow-hidden'
            >
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt='Profile'
                  className='h-full w-full object-cover'
                />
              ) : (
                <UserRound
                  size={20}
                  className='text-white'
                  style={{
                    filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))',
                  }}
                />
              )}
            </button>
            {isProfileOpen && (
              <div className='absolute z-5 right-0 mt-2 min-w-48 max-w-56 bg-black text-white rounded-lg border-2 border-gray-600 shadow-lg'>
                <ul>
                  <li className='px-4 py-2 border-b border-gray-600'>
                    <span className='block text-sm font-medium'>{user.name}</span>
                    <span className='block text-xs text-gray-400'>{user.email}</span>
                  </li>
                  <li
                    className='cursor-pointer text-sm font-poppins px-4 py-2 hover:bg-[#131314] rounded-lg'
                    onClick={() => {
                      // Dispatch logout action
                      dispatch(logout());
                      navigate('/login'); // Redirect to home page after logout
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNavbar;
