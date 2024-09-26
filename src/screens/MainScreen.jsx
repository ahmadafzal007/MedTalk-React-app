import { useState } from 'react';
import Main from '../components/chatDashboard/Main';
import Sidebar from '../components/chatDashboard/Sidebar';
import { ChatContextProvider } from '../providers/ChatsContext';

const App = () => {
  const [showForm, setShowForm] = useState(false); // Control form visibility
  const [showViewPatients, setShowViewPatients] = useState(false); // Control view patients visibility
  const [isExpanded, setIsExpanded] = useState(false); // Track sidebar expansion state

  return (
    <ChatContextProvider>
      <div className='flex'>
        <Sidebar
          setShowForm={setShowForm}
          setShowViewPatients={setShowViewPatients}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded} // Pass setIsExpanded to Sidebar
        />
        <Main
          showForm={showForm}
          showViewPatients={showViewPatients}
          setShowForm={setShowForm}
          setShowViewPatients={setShowViewPatients}
          isExpanded={isExpanded} // Pass isExpanded to Main
        />
      </div>
    </ChatContextProvider>
  );
};

export default App;
