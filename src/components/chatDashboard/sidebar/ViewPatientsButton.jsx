import { Users } from 'lucide-react' // Icon for the button

const ViewPatientsButton = ({ setShowViewPatients, isExpanded }) => {
  return (
    <div
      onClick={() => setShowViewPatients(true)} // Trigger the view patients component
      className={`mt-3 bg-black inline-flex h-11 cursor-pointer items-center gap-2 rounded-full p-3 text-sm text-white font-semibold duration-300 transition-all ease-in-out transform ${
        isExpanded ? 'w-[9rem]' : 'w-11'
      } hover:scale-105 shadow-lg`}
      style={{
        transitionDuration: '400ms',
        transitionTimingFunction: 'ease-in-out',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
      }}
    >
      <Users className='min-w-4' size={20} />
      <p
        className={`line-clamp-1 text-white font-thin duration-300 ${
          !isExpanded ? 'opacity-0' : ''
        }`}
      >
        View Patients
      </p>
    </div>
  )
}

export default ViewPatientsButton
