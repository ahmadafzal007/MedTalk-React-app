import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


const TypewriterEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) clearInterval(timer);
    }, 50); // Adjust the typing speed by changing the delay

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span style={{ borderRight: '2px solid white', animation: 'blink 1s step-end infinite' }}>
      {displayedText}
    </span>
  );
};





const Banner = () => {


  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/access');
  };




  return (
   
    <>
    <style>
      {`
        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }
      `}
    </style>


    <div className="w-full flex  pt-20 justify-between items-center">



      <div className="flex justify-start items-start flex-col gap-3 pb-12 pl-16 t ">
         

        <div>
          <button  className="   text-8xl font-bold text-white-900 leading-tight">
              MedTalk
          </button>
        </div>     
        
        <div>
          <h1 className="text-white font-sans  text-xl font-bold">
            <TypewriterEffect text="A  generative AI chatbot for Medical Purposes" />
          </h1>
        </div>

        <div>
          <p className=" font-sans text-white-900  text-start">
            Collarobate with MedTalk for healthcare information,<br/> treatment and diagnosis
          </p>
        </div>



        {/* Button */}
        
        <div className="mt-4">
        <Link to={"/access"}>
            <button
                onClick={handleClick}
                className="relative inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-700  hover:bg-gray-900 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900"><span
                    className="absolute inset-0 overflow-hidden rounded-xl"><span
                        className="absolute inset-0 rounded-xl  opacity-0 transition-opacity duration-500 group-hover:opacity-100">

                    </span>
                </span>
                <div
                    className="relative z-10 flex items-center px-6 py-3 space-x-2 rounded-xl bg-gray-950/50 ring-1 ring-white/10 ">
                    <span>Lets get started</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                        data-slot="icon" class="w-6 h-6">
                        <path fill-rule="evenodd"
                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd"></path>
                    </svg>
                </div>
                <span
                    className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
            </button>
        </Link>
    </div>

    
  </div>



      <div className="flex items-center  justify-center h-screen mr-44  ">
      <video
          className="w-full h-1/2 mb-20   "
          
          loop
          autoPlay
          muted
        >
          <source src="/MedTalkVid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
       

      </div>
    </div>

    </>
  
  );
};

export default Banner;