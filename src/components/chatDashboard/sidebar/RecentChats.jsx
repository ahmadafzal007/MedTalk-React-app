import RecentChatItem from './RecentChatItem';

const RecentChats = ({ chats, handleChatClick, isGenerating }) => {
  return (
    <div className=' h-60 animate-fade-in flex flex-col mt-4'>
      <p className='mb-1 ml-1  pt-3  text-xs border-t border-gray-600 text-white'>Recent Chats</p>

      {/* Scrollable container for recent chats with custom scrollbar */}
      <div className='mt-1 text-xs overflow-y-auto h-full scrollbar-thin scrollbar-thumb-rounded'>
        {chats.length > 0 ? (
          chats.map((chat, idx) => (
            <RecentChatItem
              key={`${chat.name}-${idx}`}
              onClick={!isGenerating ? () => handleChatClick(chat) : undefined}
              label={chat.name}
              className='text-white flex gap-1 items-center p-2 hover:bg-gray-700 rounded-lg transition duration-300 ease-in-out'
            />
          ))
        ) : (
          <p className='text-gray-500'>No recent chats</p>
        )}
      </div>
    </div>
  );
};

export default RecentChats;
