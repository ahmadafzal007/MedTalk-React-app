import { useContext, useState } from 'react';
import ChatContext from '../../providers/ChatsContext';
import SidebarToggle from './sidebar/SidebarToggle';
import NewChatButton from './sidebar/NewChatButton';
import SearchBar from './sidebar/SearchBar';
import RecentChats from './sidebar/RecentChats';
import AddPatientButton from './sidebar/AddPatientButton';
import ViewPatientsButton from './sidebar/ViewPatientsButton';
import SidebarMenuItems from './sidebar/SidebarMenuItems';
import UpgradeCard from './sidebar/UpgardeCard'; // New component

const Sidebar = ({ setShowForm, setShowViewPatients ,setIsExpanded, isExpanded,
}) => {
  const { startNewChat, isGenerating } = useContext(ChatContext);
  // const [isExpanded, setIsExpanded] = useState(false); // Default state is collapsed (false)
  const [recentChats, setRecentChats] = useState([]); // Track recent chats
  const [chatCounter, setChatCounter] = useState(1); // Counter for naming chats

  const toggleSidebarExpand = () => {
    localStorage.setItem('isExpanded', !isExpanded); // Save state to local storage
    setIsExpanded((prev) => !prev);
  };

  const handleNewChat = () => {
    startNewChat();
    setShowForm(false);
    setShowViewPatients(false);

    // Update recent chats list (keep only the 3 most recent chats)
    setRecentChats((prevChats) => {
      const updatedChats = [
        ...prevChats,
        { name: `New Chat ${chatCounter}`, id: chatCounter },
      ];
      if (updatedChats.length > 3) {
        updatedChats.shift();
      }
      return updatedChats;
    });

    setChatCounter((prevCounter) => prevCounter + 1);
  };

  const handleAddPatient = () => {
    setShowForm(true);
    setShowViewPatients(false);
  };

  const handleViewPatients = () => {
    setShowViewPatients(true);
    setShowForm(false);
  };

  return (
    <div
      className={`z-3 hidden  font-poppins h-screen flex-col justify-between text-white px-4 py-6 backdrop-blur-lg shadow-xl bg-[#151518] border border-gray-700 transform transition-all ${
        isExpanded ? 'w-[350px] max-w-[350px] ' : 'w-[4.75rem]'
      } overflow-y-auto overflow-x-hidden sm:flex sm:inline-flex`} // Ensure it's visible in larger screens
    >
      <div className='w-full'>
        {/* Only render this section if expanded or on medium screens */}
        {isExpanded || window.innerWidth >= 640 ? (
          <>
            <SidebarToggle toggleSidebarExpand={toggleSidebarExpand} />
            <NewChatButton
              isGenerating={isGenerating}
              handleNewChat={handleNewChat}
              isExpanded={isExpanded}
            />
            <AddPatientButton
              isExpanded={isExpanded}
              setShowForm={handleAddPatient}
            />
            <ViewPatientsButton
              isExpanded={isExpanded}
              setShowViewPatients={handleViewPatients}
            />
            {isExpanded && (
              <RecentChats
                chats={recentChats}
                handleChatClick={() => {
                  setShowForm(false);
                  setShowViewPatients(false);
                }}
                isGenerating={isGenerating}
              />
            )}
          </>
        ) : (
          <SidebarToggle toggleSidebarExpand={toggleSidebarExpand} /> // Show toggle button only if collapsed
        )}
      </div>
      {/* Upgrade Card */}
      {isExpanded && <UpgradeCard />} {/* Only show upgrade card if expanded */}
    </div>
  );
};

export default Sidebar;
