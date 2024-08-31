import Main from '../components/chatDashboard/Main';
import Sidebar from '../components/chatDashboard/Sidebar';

const App = () => {
	return (
		<div className='flex '>
			<Sidebar />
			<Main />
		</div>
	);
};

export default App;
