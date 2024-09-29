import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './screens/LandingPage';
import FAQ from './screens/FAQpage';
import Login from './screens/access/Login';
import SignUp from './screens/access/signup';
import Main from './screens/MainScreen';
import Dashboard from './screens/Dashboard/Dashboard';
import RadiologistData from './screens/RadiologistData';
import { Provider } from 'react-redux';
import store from './redux/store';
import HospitalDashboard from './components/Doctor/DoctorDashboard';
import Avatar from './screens/Avatar';
import { ChatProvider } from './components/Avatar/hooks/useChat'; // Import ChatProvider
import React, { Suspense } from 'react';
import { Loader } from "@react-three/drei"; // Import Loader
import "./index.css";
import MedtalkPro from './screens/medtalkPro'
import UpgradeMedtalk from './screens/UpgradeMedtalk'
import DoctorRegistration from './screens/access/doctorRegistration'
import UpgradeForm from './screens/access/upgradeForm'
import HospitalRegistration from './screens/access/hospitalRegistration'

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
          <Route path='/hospitaldashboard' element={<HospitalDashboard />} />
          <Route path='/medtalkpro' element={<MedtalkPro />} />
          <Route path='/upgrademedtalk' element={<UpgradeMedtalk />} />
          <Route path='/registerdoctor' element={<DoctorRegistration />} />
          <Route path='/upgradeform' element={<UpgradeForm />} />
          <Route path='/registerhospital' element={<HospitalRegistration />} />

          {/* Wrap only the Avatar route with Suspense and ChatProvider */}
          <Route 
            path='/avatar' 
            element={
              <Suspense fallback={<Loader />}>
                <ChatProvider>
                  <Avatar />
                </ChatProvider>
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
