import React from "react";
import FAQ from "../components/FAQ/FAQ.jsx";
import Header from "../components/FAQ/FAQnav.jsx";
import ParticlesComponent from "../components/Landing/particles.jsx";
const FAQpage = () => {
  return (
    <div >
      <div>
        <ParticlesComponent id="particles" />
        <Header />
      </div>
      <div>
        <FAQ />
      </div>
    </div>
  );
};

export default FAQpage;
