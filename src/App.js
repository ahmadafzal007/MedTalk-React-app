import './App.css';
import Welcome from "./screens/Welcome";
import AccessPage from "./screens/AccessPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FAQ from './screens/FAQpage';
import ScholarSignUpForm from './components/Scholar/SignUp';
import DoctorSignUpForm from './components/Doctor/SignUp';
import HospitalSignUpForm from './components/Hospital/SignUp';
import LoginForm from './components/Access/LoginForm';
import DoctorDashboardForm from './components/Doctor/Dashboard';
import MainDashBoard from './screens/mainDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/access" element={<AccessPage />} />
        <Route path="/faq" element={<FAQ/>} />
        <Route exact path="/scholarSignUp" element={<ScholarSignUpForm />} />
        <Route path="/doctorSignUp" element={<DoctorSignUpForm />} />
        <Route path="/hospitalSignUp" element={<HospitalSignUpForm/>} />
        <Route path="/login/scholar" element={<LoginForm role={"Scholar"}/> } />
        <Route path="/login/Hospital" element={<LoginForm role={"Hospital"}/> } />
        <Route path="/login/Doctor" element={<LoginForm role={"Doctor"}/> } />
        <Route path="/doctorDB" element={<DoctorDashboardForm/>} />
        <Route path="/mainDB" element={<MainDashBoard/>} />
        


      </Routes>
    </Router>
  
  );
}

export default App;
