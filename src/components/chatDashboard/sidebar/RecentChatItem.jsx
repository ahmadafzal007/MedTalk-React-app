const RecentChatItem = ({ label, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-2   my-1 border border-gray-700 hover:hover:bg-[#1e1e22] hover:scale-100h  hover:border-white shadow-md rounded-lg ${className}`}>
      {label}
    </div>
  )
}

export default RecentChatItem

