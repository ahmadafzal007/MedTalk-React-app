import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./screens/LandingPage";
import FAQ from "./screens/FAQpage";
import Login from "./screens/access/Login";
import SignUp from "./screens/access/signup";



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

      </Routes>
    </Router>
  );
}

export default App;
