import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './screens/LandingPage'
import FAQ from './screens/FAQpage'
import Login from './screens/access/Login'
import SignUp from './screens/access/signup'
import Main from './screens/MainScreen'
import Dashboard from './screens/Dashboard/Dashboard'
import RadiologistData from './screens/RadiologistData' // Import the RadiologistData screen
import { Provider } from 'react-redux' // Import Provider from react-redux
import store from './redux/store' // Import your Redux store

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/main' element={<Main />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/radiologist' element={<RadiologistData />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
