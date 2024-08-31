import {
  Stethoscope,
  Pill,
  Thermometer,
  HeartPulse,
  SendHorizonal,
  UserRound,
} from "lucide-react";
import { ChevronDown } from "lucide-react"; // Import the dropdown icon

import { useContext, useState } from "react";
import ChatContext from "../../providers/ChatsContext";

const Main = () => {
  const {
    sendPrompt,
    setPrompt,
    recentPrompt,
    prompt,
    isPending,
    isGenerating,
    output,
    showResult,
  } = useContext(ChatContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSendPrompt = () => {
    sendPrompt(prompt);
  };

  return (
    <div className="relative font-inconsolata h-screen w-full flex flex-col bg-black text-white">
      <nav className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 text-base font-light">
      <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-base font-thin text-white flex items-center gap-2"
      >
        MedTalk
        <ChevronDown
          size={15}
          className={`transition-transform ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-black text-white rounded-lg border-2 border-white shadow-lg">
          <ul>
            <li
              className="cursor-pointer text-sm px-4 py-2 hover:bg-[#131314] rounded-lg"
              onClick={() => alert('MedTalk Pro')}
            >
              MedTalk Pro
            </li>
            {/* <li className="cursor-pointer px-4 py-2 hover:bg-gray-700" onClick={() => alert('Another Option')}>Another Option</li> */}
          </ul>
        </div>
      )}
    </div>
        {" "}
        <div>
          <ul className="flex items-center gap-2 md:gap-3 text-sm md:text-lg font-bold">
            <li>
              <button className="hidden font-thin md:block text-base md:mr-4">
                Try MedTalk Pro
              </button>
            </li>
            <li className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-800 shadow-md">
              <UserRound
                size={20}
                className="text-white"
                style={{
                  filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))",
                }}
              />
            </li>
          </ul>
        </div>
      </nav>




      <main className="flex-1  overflow-y-auto px-4 py-5 md:px-6 md:py-8">
        <div className="lg:w-[1000px] ml-[120px]">

        {!showResult ? (
          <section className="text-start">
            <p className="text-3xl md:text-4xl font-semibold text-gray-400">
              <div className="flex flex-col md:ml-36 ">
                <span
                  className="text-4xl text-start font-permanent font-bold mb-12 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 shadow-md"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #d1d5db, #6b7280, #4b5563)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Hello, Researcher
                </span>
                <span
                  className="text-3xl text-start font-permanent font-bold mb-12 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 shadow-md"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #d1d5db, #6b7280, #4b5563)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  How can I help you today?
                  </span>
            
              </div>
            </p>
            <div className="flex font-thin items-center justify-center">
              <div className="w-[720px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-20 mt-10">
                {[
                  {
                    label: "Explain the mechanism of a common medication",
                    Icon: Pill,
                  },
                  {
                    label: "Give advice on managing a chronic condition",
                    Icon: HeartPulse,
                  },
                  {
                    label: "Outline the steps for a basic medical procedure",
                    Icon: Stethoscope,
                  },
                  {
                    label:
                    "Provide tips for measuring and recording vital signs",
                    Icon: Thermometer,
                  },
                ].map(({ label, Icon }, idx) => (
                  <div
                  className="relative h-28 md:h-44 w-40 cursor-pointer text-xs rounded-xl  from-gray-700 via-gray-800 to-gray-900 backdrop-blur-lg shadow-xl transform transition-all p-4 text-white   "
                  key={idx}
                  style={{
                    boxShadow:
                    "0 0 10px rgba(255, 255, 255, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.5)",
                    transitionDuration: "400ms",
                  }}
                  >
                    <p className="text-gray-300">{label}</p>
                    <div className="absolute bottom-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 shadow-lg">
                      <Icon
                        size={20}
                        className="text-white"
                        style={{
                          filter:
                          "drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))",
                        }}
                        />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section>
            <div className="my-8 flex items-center gap-4">
              <div className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full  shadow-md">
                <UserRound
                  className="text-gray-300"
                  size={20}
                  style={{
                    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))",
                  }}
                />
              </div>
              <p className="text-gray-300">{recentPrompt}</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10">
                <img
                  className={`w-6 md:w-7 transition-transform duration-500 ${
                    isPending
                    ? "animate-pulse"
                    : isGenerating
                    ? "animate-spin"
                    : ""
                  }`}
                  src="/gemini.svg"
                  alt="gemini icon"
                  style={{
                    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))",
                  }}
                  />
              </div>

              {isPending ? (
                <div className="flex flex-col gap-2">
                  {[...Array(3).keys()].map((i) => (
                    <hr
                    key={i}
                    className={`mt-1.5 h-4 md:h-5 rounded-md border-none bg-gray-800 bg-gradient-to-r from-[#9ed7ff] via-[#ffffff] to-[#9ed7ff] [background-size:800px_50px] [animation-delay:${
                      (i + 1) * 100
                    }ms] [animation-duration:${4 - i}s] shadow-md`}
                    />
                  ))}
                </div>
              ) : (
                <p
                className="text-gray-300 font-light leading-relaxed"
                dangerouslySetInnerHTML={{ __html: output }}
                />
              )}
            </div>
          </section>
        )}

        <div className=" bottom-0 left-0 flex flex-col items-center bg-black right-0 mx-auto max-w-screen px-4 py-3 md:px-6 md:py-4 backdrop-blur-sm">
          <div
            className="flex items-center  justify-between gap-3 rounded-full max-w-[800px] bg-[#131314] px-4 py-2 md:px-5 md:py-3 shadow-lg"
            style={{
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)", // Border glow effect
            }}
            >
            <input
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendPrompt()}
              className="flex-1 text-white w-[300px] md:w-[400px] lg:w-[600px] md:h-[30px] border-none bg-transparent font-thin outline-none"
              type="text"
              placeholder="Enter a prompt here"
              value={prompt}
              disabled={isGenerating}
              />

            <div className="flex items-center gap-2 text-gray-300">
              <SendHorizonal
                size={16}
                onClick={handleSendPrompt}
                style={{
                  filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))",
                }}
                />
            </div>
          </div>
          <p className="mt-3 w-[300px] md:w-[400px] lg:w-[600px] font-thin md:ml-4 text-center text-xs font-light text-gray-300">
            MedTalk may display inaccurate info, including about diagnosis, so
            if you are using it as a patient, must refer to your doctor.
          </p>
        </div>
      </div>
      </main>
    </div>
  );
};

export default Main;
