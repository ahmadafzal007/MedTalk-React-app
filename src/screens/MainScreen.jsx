import Main from '../components/chatDashboard/Main';
import Sidebar from '../components/chatDashboard/Sidebar';
import { ChatContextProvider } from '../providers/ChatsContext';

const App = () => {
	return (
		<ChatContextProvider>
		<div className='flex '>
			<Sidebar />
			<Main />
		</div>
		</ChatContextProvider>
	);
};

export default App;
