import { useContext, useState, useEffect } from 'react';
import ChatContext from '../../providers/ChatsContext';
import SidebarToggle from './sidebar/SidebarToggle';
import NewChatButton from './sidebar/NewChatButton';
import AddPatientButton from './sidebar/AddPatientButton';
import ViewPatientsButton from './sidebar/ViewPatientsButton';
import UpgradeCard from './sidebar/UpgardeCard';
import ChatController from '../../API/chat';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = ({
  setShowForm,
  setShowViewPatients,
  chatHistory,
  setIsExpanded,
  isExpanded,
}) => {
  const { setChatHistory, refreshSideBar } = useContext(ChatContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [userChats, setUserChats] = useState([]);

  const chatId = location.pathname.split('/chat/')[1];

  const userRole = useSelector((state) => state.user.role);

  const getUserChats = async () => {
    try {
      const response = await ChatController.getUserChats();
      setUserChats(response.chats);
    } catch (err) {
      console.error('Failed to fetch user chats:', err);
    }
  };

  useEffect(() => {
    getUserChats();
  }, [chatHistory, refreshSideBar, chatId]);

  const handleChatClick = (chat) => {
    setShowForm(false);
    setChatHistory(false);
    setChatHistory(chat.messages);
    setShowViewPatients(false);
    navigate('/chat/' + chat._id);
    
  };

  const toggleSidebarExpand = () => {
    localStorage.setItem('isExpanded', !isExpanded);
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`z-3 hidden font-poppins h-screen flex flex-col text-white px-4 py-6 backdrop-blur-lg shadow-xl bg-[#151518] border border-gray-700 transform transition-all ${
        isExpanded ? 'w-[350px] max-w-[350px]' : 'w-[4.75rem]'
      } overflow-x-hidden sm:flex`}
    >
      <div className="w-full">
        <SidebarToggle toggleSidebarExpand={toggleSidebarExpand} />
      </div>

      <div className="overflow-y-auto hide-scrollbar flex-grow">
        <div className="w-full">
          {isExpanded && (
            <>
              <NewChatButton
                handleNewChat={() => setShowForm(false)}
                isExpanded={isExpanded}
              />

              {userRole === 'doctor' && (
                <>
                  <AddPatientButton
                    isExpanded={isExpanded}
                    setShowForm={setShowForm}
                    setShowViewPatients={setShowViewPatients}
                  />
                  <ViewPatientsButton
                    isExpanded={isExpanded}
                    setShowForm={setShowForm}
                    setShowViewPatients={setShowViewPatients}
                  />
                </>
              )}

              <div className="mt-4">
                <h3 className="text-gray-400 text-sm mb-3">Recent Chats</h3>
                <ul className="space-y-3">
                  {userChats
                    .slice()
                    .reverse()
                    .map((chat) => (
                      <li
                        key={chat._id}
                        className={`rounded-md cursor-pointer p-1 hover:bg-[#1e1e22] transition ${
                          chat._id === chatId
                            ? 'bg-[#1e1e22] border-4 border-gray-700'
                            : 'border border-gray-700'
                        }`}
                        onClick={() => handleChatClick(chat)}
                      >
                        <div className="text-white text-xs">
                          {/* {chat.patient ? chat.patient.name : ''} */}
                        </div>
                        {chat.messages.length > 0 ? (
                          <div className="text-white text-xs truncate">
                            {chat.messages[0].prompt}
                          </div>
                        ) : (
                          <div className="text-white text-xs">No messages yet</div>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {isExpanded && userRole !== 'doctor' && <UpgradeCard />}
    </div>
  );
};

export default Sidebar;
