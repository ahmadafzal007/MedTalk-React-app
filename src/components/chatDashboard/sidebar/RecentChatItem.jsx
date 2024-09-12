const RecentChatItem = ({ label, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-2 hover:bg-gray-700 rounded-lg ${className}`}
    >
      {label}
    </div>
  )
}

export default RecentChatItem
