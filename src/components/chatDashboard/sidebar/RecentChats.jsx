import RecentChatItem from './RecentChatItem'

const RecentChats = ({ chats, handleChatClick, isGenerating }) => {
  return (
    <div className='animate-fade-in flex flex-col mt-6'>
      <p className='my-1 ml-1 text-white'>Recent Chats</p>
      <div className='mt-1'>
        {chats.length > 0 ? (
          chats.map((chat, idx) => (
            <RecentChatItem
              key={`${chat.name}-${idx}`}
              onClick={!isGenerating ? () => handleChatClick(chat) : undefined}
              label={chat.name}
              className='text-white flex gap-1 items-center'
            />
          ))
        ) : (
          <p className='text-gray-500'>No recent chats</p>
        )}
      </div>
    </div>
  )
}

export default RecentChats
