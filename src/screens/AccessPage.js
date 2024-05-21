import React, { useState } from 'react';
import Card from '../components/Access/Card';
import ParticlesComponent from '../components/Welcome/particles';
import Header from "../components/Access/Accessnav";

const AccessPage = () => {
  
return (
  <div>
      <div >
      <ParticlesComponent id="particles"/>
      <Header />
      </div>
     <div>
       <Card/>
     </div>
     
    
  </div>

    
  );
};

export default AccessPage;


