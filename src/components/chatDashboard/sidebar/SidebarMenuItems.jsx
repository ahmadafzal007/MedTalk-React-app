import SidebarMenuItem from './SidebarMenuItem'
import { CircleHelp, History, Settings } from 'lucide-react'

const SidebarMenuItems = ({ isExpanded }) => {
  const menuItems = [
    { label: 'Settings', icon: Settings },
    { label: 'History', icon: History },
    { label: 'Help', icon: CircleHelp },
  ]

  return (
    <div className='flex flex-col space-y-3'>
      {menuItems.map(({ label, icon }, idx) => (
        <SidebarMenuItem
          key={idx}
          Icon={icon}
          label={label}
          isExpanded={isExpanded}
          className={`text-white flex transition-transform ease-in-out ${
            isExpanded ? 'translate-x-0' : '-translate-x-3'
          } hover:scale-110`}
          style={{
            transitionDuration: '400ms',
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
          }}
        />
      ))}
    </div>
  )
}

export default SidebarMenuItems
