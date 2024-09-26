import { ArrowUpRight } from 'lucide-react'

const UpgradeCard = () => {
  return (
    <div className="mt-6 p-4 font-poppins bg-[#1e1e22] border border-gray-700 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold pb-2 text-white">Upgrade!</h3>
      <p className="text-xs text-gray-400">
        Get access to premium features by upgrading your plan.
      </p>
      <div className="mt-2 flex items-center">
        <a
          href="#"
          className="text-sm text-blue-600 flex items-center gap-1 hover:underline"
        >
          MedTalk Pro <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  )
}

export default UpgradeCard
