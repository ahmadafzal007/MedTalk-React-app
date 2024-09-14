import { Plus } from 'lucide-react'

const AddPatientButton = ({ isExpanded, setShowForm }) => {
  return (
    <div
      onClick={() => setShowForm(true)} // Show form on button click
      className={`mt-3 bg-black inline-flex h-11 cursor-pointer items-center gap-2 rounded-full p-3 text-sm text-white font-semibold duration-300 transition-all ease-in-out transform ${
        isExpanded ? 'w-[9rem]' : 'w-11'
      } hover:scale-105 shadow-lg`}
      style={{
        transitionDuration: '400ms',
        transitionTimingFunction: 'ease-in-out',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
      }}
    >
      <Plus className='min-w-4' size={20} />
      <p
        className={`line-clamp-1 text-white font-thin duration-300 ${
          !isExpanded ? 'opacity-0' : ''
        }`}
      >
        Add Patient
      </p>
    </div>
  )
}

export default AddPatientButton
