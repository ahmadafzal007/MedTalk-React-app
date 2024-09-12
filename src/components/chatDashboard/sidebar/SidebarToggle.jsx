import { Menu } from 'lucide-react'

const SidebarToggle = ({ toggleSidebarExpand }) => {
  return (
    <button
      onClick={toggleSidebarExpand}
      className='grid bg-black place-items-center rounded-full p-3 hover:bg-gray-900/80 transition-all ease-in-out transform hover:scale-110 shadow-lg text-white'
      style={{
        transitionDuration: '400ms',
        transitionTimingFunction: 'ease-in-out',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
      }}
    >
      <Menu size={20} />
    </button>
  )
}

export default SidebarToggle
