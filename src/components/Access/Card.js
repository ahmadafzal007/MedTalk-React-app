import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';



function Card() {
  


  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return  (
   

  <div className='h-screen w-full bg-black text-white fixed  mt-[89px] md:overflow-hidden'>

    <div className='  flex justify-center items-center pt-12 mr-16 space-x-2 flex-col' >
      <p className='font-bold font-sans md:font-serif text-2xl text-white'>DEFINING FUTURE IN HEALTHCARE</p>
      <p className=' text-white font-sans md:font-serif m-2 '> Select Your Role to Begin</p>
      </div>


    
<div className=" bg-black flex items-center justify-center  py-12 md:overflow-hidden ">
      {/* <div className='text-white'>Select Your Category</div> */}
  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">


  

  <motion.div 
   variants={dropIn}
   initial="hidden"
   animate="visible"
  
  className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 mr-20">
      {/* Decreased width and height */}
      <div className="h-[24rem] w-[20rem]"> {/* Adjust the size to your preference */}
        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110" src="./Hospital.webp" alt="" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
      <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
        <h1 className=" text-3xl font-sans md:font-serif font-bold text-white">Hospital</h1> {/* Adjusted text size */}
        <p className="mb-6 text-base mt-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">ECG and X-Ray Diagnosis. <br/>Medical Query Prompting. <br/>Authorizing Healthcare Staff.</p>
        
        <Link to={"/login/Hospital"}>
        <button className="rounded-full bg-neutral-900 py-2 px-3 text-sm capitalize text-white shadow shadow-black/60 mb-2 border-2 border-black hover:bg-neutral-700 transition duration-300 ease-in-out">Sign In</button> {/* Adjusted padding and font size */}
        </Link>

        <Link to={"/hospitalSignUp"}>
        <button className="rounded-full bg-neutral-900 py-2 px-3 text-sm capitalize text-white shadow shadow-black/60 mb-2 border-2 border-black hover:bg-neutral-700 transition duration-300 ease-in-out">Sign Up</button> {/* Adjusted padding and font size */}
        </Link>
      </div>
    </motion.div>




    <motion.div 
   variants={dropIn}
   initial="hidden"
   animate="visible"
    
    className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 mr-20">
      {/* Decreased width and height */}
      <div className="h-[24rem] w-[20rem]"> {/* Adjust the size to your preference */}
        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110" src="./Doctor.webp" alt="" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
      <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
        <h1 className=" text-3xl font-sans md:font-serif font-bold text-white">Doctor</h1> {/* Adjusted text size */}
        <p className="mb-6 mt-3 text-base text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">ECG and X-Ray Diagnosis. <br/>Medical Query Prompting. </p>
        
        <Link to={"/login/Doctor"}>
        <button className="rounded-full bg-neutral-900 py-2 px-3 text-sm capitalize text-white shadow shadow-black/60 mb-2 border-2 border-black hover:bg-neutral-700 transition duration-300 ease-in-out">Sign In</button> {/* Adjusted padding and font size */}
        </Link>
        
        <Link to={'/doctorSignUp'}>
        <button className="rounded-full bg-neutral-900 py-2 px-3 text-sm capitalize text-white shadow shadow-black/60 mb-2 border-2 border-black hover:bg-neutral-700 transition duration-300 ease-in-out">Sign Up</button> {/* Adjusted padding and font size */}
        </Link>

      </div>
    </motion.div>





  <motion.div

  variants={dropIn}
  initial="hidden"
  animate="visible"
  
  className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 mr-20">
      {/* Decreased width and height */}
      <div className="h-[24rem] w-[20rem]"> {/* Adjust the size to your preference */}
        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110" src="scholar.webp" alt="" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
      <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
        <h1 className="font-sans md:font-serif  text-3xl  font-bold text-white">Scholar</h1> {/* Adjusted text size */}
        <p className="mb-6 mt-3 text-base text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Medical Query Prompting.</p>
        
        <Link to={"/login/Scholar"}>
        <button className="rounded-full bg-neutral-900 py-2 px-3 text-sm capitalize text-white shadow shadow-black/60 mb-2 border-2 border-black hover:bg-neutral-700 transition duration-300 ease-in-out">Sign In</button> {/* Adjusted padding and font size */}
        </Link>

        <Link to={"/scholarSignUp"}>
        <button className="rounded-full bg-neutral-900 py-2 px-3 text-sm capitalize text-white shadow shadow-black/60 mb-2 border-2 border-black hover:bg-neutral-700 transition duration-300 ease-in-out">Sign Up</button> {/* Adjusted padding and font size */}
        </Link>

      </div>
    </motion.div>

  </div>
 
 </div>

</div>

  );
}

export default Card;
