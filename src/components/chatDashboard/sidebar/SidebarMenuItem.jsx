const SidebarMenuItem = ({ Icon, label, isExpanded, className }) => {
  return (
    <div
      className={`cursor-pointer p-2 hover:bg-gray-700 rounded-lg ${className}`}
    >
      <Icon size={20} />
      {isExpanded && <span className='ml-2'>{label}</span>}
    </div>
  )
}

export default SidebarMenuItem
