import { useSelector } from 'react-redux'

const ViewPatients = () => {
  const patients = useSelector((state) => state.patients.patientList)

  return (
    <div className='max-w-4xl mx-auto p-6 bg-gray-900 text-gray-200 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-6 text-gray-100'>Patient List</h2>
      {patients.length > 0 ? (
        <table className='min-w-full bg-gray-800'>
          <thead>
            <tr className='text-left'>
              <th className='py-3 px-4 text-gray-400'>Name</th>
              <th className='py-3 px-4 text-gray-400'>Age</th>
              <th className='py-3 px-4 text-gray-400'>Condition</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={index} className='border-t border-gray-700'>
                <td className='py-3 px-4'>{patient.name}</td>
                <td className='py-3 px-4'>{patient.age}</td>
                <td className='py-3 px-4'>{patient.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-gray-500'>No patients added yet.</p>
      )}
    </div>
  )
}

export default ViewPatients
