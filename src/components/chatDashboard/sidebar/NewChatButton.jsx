import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewChatButton = ({ isGenerating, handleNewChat, isExpanded }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isGenerating) {
      navigate('/main');
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`mt-3 rounded-lg border-gray-600 hover:border-white inline-flex h-8 cursor-pointer items-center gap-2 p-3 text-sm text-white font-semibold duration-300 transition-all ease-in-out transform ${
        isExpanded ? 'w-[100%]' : 'w-11' // Stretch to full width when expanded
      } hover:bg-[#1e1e22] hover:scale-105 shadow-md`}
    >
      <Plus className="min-w-4 text-gray-300" size={20} />
      <p
        className={`line-clamp-1 text-xs text-white font-normal duration-300 ${
          !isExpanded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        New Chat
      </p>
    </div>
  );
};

export default NewChatButton;
