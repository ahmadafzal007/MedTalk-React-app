import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
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

      <div className="w-full flex  pt-20 justify-between items-center ">
        <div className="flex justify-start items-start pl-8 flex-col gap-3 pb-12 md:pl-16  ">
          <div className="mt-44 lg:mt-0">
            <div className="font-dancing text-7xl  md:text-8xl font-bold text-white-900 leading-tight">
              MedTalk
            </div>
          </div>

          <div>
            <h1 className="text-white font-dancing xsm:text-sm text-base md:text-xl font-bold mr-8 md:mr-0 text-start">
              A generative AI chatbot for Medical Purposes
            </h1>
          </div>

          <div>
            <p className=" font-dancing md:w-[500px] text-white-700  text-sm md:text-base text-start mr-8 md:mr-0">
              Collarobate with MedTalk for healthcare information, treatment and
              diagnosis
            </p>
          </div>

          {/* Button */}

          <div className="mt-4">
            <button className="relative inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-800 hover:bg-gray-900 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900 animate-float">
              <span className="absolute inset-0 overflow-hidden rounded-xl">
                <span className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              </span>
              <div className="relative z-10 flex items-center px-6 py-3 space-x-2 rounded-xl bg-gray-950/50 ring-1 ring-white/10">
                <span>Let's get started</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
            </button>
          </div>
        </div>

        <div className="items-center  justify-center h-screen  hidden lg:flex">
          <video
            className="max-w-[700px] max-h-[400px] min-w-[700px] min-h-[400px] mb-20"
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
