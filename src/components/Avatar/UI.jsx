import { useRef, useState } from "react";
import { useChat } from "./hooks/useChat";
import { useNavigate } from "react-router-dom"; // For navigation
import './UI.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {

  faPaperPlane

} from '@fortawesome/free-solid-svg-icons'

export const UI = ({ hidden, ...props }) => {
  const input = useRef();
  const navigate = useNavigate(); // Hook for navigation
  const { chat, cameraZoomed, setCameraZoomed } = useChat();
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const sendMessage = (message) => {
    chat(message || input.current.value);
    if(message === undefined || message === null){
      console.log("empty message passed");
    }
    console.log("Message sent:", message || input.current.value);
    input.current.value = "";
  };

  const startListening = () => {
    if (!recognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onstart = () => {
        console.log(
          "Voice recognition started. Try speaking into the microphone."
        );
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        console.log(`Result received: ${speechResult}`);
        sendMessage(speechResult);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error(`Error occurred in recognition: ${event.error}`);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
      recognitionInstance.start();
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  if (hidden) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="w-full flex items-center justify-between gap-4">
          {/* Back Button */}
          <button
             onClick={() => navigate(-1)}  // Redirects to the main route
            className="pointer-events-auto border bg-black border-gray-700 hover:border-white text-white p-2 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Logo in the Center */}
          <div className="pointer-events-auto">
            <img
              src="/medtalk-main.png"
              alt="MedTalk Logo"
              className="h-8" // Adjust height as needed
            />
          </div>

          {/* Zoom Button */}
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="pointer-events-auto bg-black border border-gray-700 hover:border-white text-white p-[8px] rounded-md"
          >
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
        <div className="flex items-center relative">
  <input
    className="flex-1 h-13 font-poppins  text-sm pl-8 pr-8 text-white placeholder:text-gray-300 font-light w-[300px] md:w-[400px] lg:w-[560px] p-4 rounded-lg bg-opacity-50 bg-black border border-gray-600 backdrop-blur-md"
    placeholder="Enter a prompt here"
    ref={input}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        sendMessage(); // Keep the original functionality
      }
    }}
  />
  <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-300 cursor-pointer">
    <FontAwesomeIcon
      icon={faPaperPlane} // Using the paper plane icon
      size="lg"
      onClick={() => sendMessage()} // Keeping the same send functionality
      className="filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
    />
  </div>
</div>


          <button
            onClick={startListening}
            className={`pointer-events-auto bg-black border-gray-700 hover:border-white  text-white p-3 rounded-md bg-opacity-50 backdrop-blur-md ${
              isListening ? "bg-black border-white" : ""
            }`}
          >
            {isListening ? (
              <svg
                width="24px"
                height="24px"
                viewBox="-5 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                fill="#000000"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>microphone</title>{" "}
                  <desc>Created with Sketch Beta.</desc>{" "}
                  <defs> </defs>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    sketch:type="MSPage"
                  >
                    {" "}
                    <g
                      id="Icon-Set-Filled"
                      sketch:type="MSLayerGroup"
                      transform="translate(-107.000000, -309.000000)"
                      fill="#ffffff"
                    >
                      {" "}
                      <path
                        d="M118,333 C121.866,333 125,329.866 125,326 L125,316 C125,312.134 121.866,309 118,309 C114.134,309 111,312.134 111,316 L111,326 C111,329.866 114.134,333 118,333 L118,333 Z M129,328 L127,328 C126.089,332.007 122.282,335 118,335 C113.718,335 109.911,332.007 109,328 L107,328 C107.883,332.799 112.063,336.51 117,336.955 L117,339 L116,339 C115.448,339 115,339.448 115,340 C115,340.553 115.448,341 116,341 L120,341 C120.552,341 121,340.553 121,340 C121,339.448 120.552,339 120,339 L119,339 L119,336.955 C123.937,336.51 128.117,332.799 129,328 L129,328 Z"
                        id="microphone"
                        sketch:type="MSShapeGroup"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            ) : (
              <svg
                width="24px"
                height="24px"
                viewBox="-3.5 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>microphone-off</title>{" "}
                  <desc>Created with Sketch Beta.</desc> <defs> </defs>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    sketch:type="MSPage"
                  >
                    {" "}
                    <g
                      id="Icon-Set-Filled"
                      sketch:type="MSLayerGroup"
                      transform="translate(-156.000000, -309.000000)"
                      fill="#ffffff"
                    >
                      {" "}
                      <path
                        d="M169,335 C167.061,335 165.236,334.362 163.716,333.318 L162.31,334.742 C163.944,335.953 165.892,336.765 168,336.955 L168,339 L167,339 C166.448,339 166,339.448 166,340 C166,340.553 166.448,341 167,341 L171,341 C171.552,341 172,340.553 172,340 C172,339.448 171.552,339 171,339 L170,339 L170,336.955 C174.938,336.51 179.117,332.799 180,328 L178,328 C177.089,332.007 173.282,335 169,335 L169,335 Z M176,326 L176,320.739 L164.735,331.515 C165.918,332.432 167.386,333 169,333 C172.866,333 176,329.866 176,326 L176,326 Z M160.047,328.145 L160,328 L158,328 C158.109,328.596 158.271,329.175 158.478,329.733 L160.047,328.145 L160.047,328.145 Z M179.577,312.013 L155.99,334.597 L157.418,336.005 L181.014,313.433 L179.577,312.013 L179.577,312.013 Z M169,309 C165.134,309 162,312.134 162,316 L161.997,326.309 L175.489,313.401 C174.456,310.825 171.946,309 169,309 L169,309 Z"
                        id="microphone-off"
                        sketch:type="MSShapeGroup"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
};




// import { useRef, useState } from "react";
// import { useChat } from "./hooks/useChat";
// import './UI.css';
// export const UI = ({ hidden, ...props }) => {
//   const input = useRef();
//   const { chat, cameraZoomed, setCameraZoomed } = useChat();
//   const [recognition, setRecognition] = useState(null);
//   const [isListening, setIsListening] = useState(false);

//   const sendMessage = (message) => {
//     chat(message || input.current.value);
//     if(message === undefined || message === null){
//       console.log("empty message passed");
//     }
//     console.log("Message sent:", message || input.current.value);
//     input.current.value = "";
//   };

//   const startListening = () => {
//     if (!recognition) {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       const recognitionInstance = new SpeechRecognition();
//       recognitionInstance.continuous = false;
//       recognitionInstance.interimResults = false;
//       recognitionInstance.lang = "en-US";

//       recognitionInstance.onstart = () => {
//         console.log(
//           "Voice recognition started. Try speaking into the microphone."
//         );
//         setIsListening(true);
//       };

//       recognitionInstance.onresult = (event) => {
//         const speechResult = event.results[0][0].transcript;
//         console.log(`Result received: ${speechResult}`);
//         sendMessage(speechResult);
//         setIsListening(false);
//       };

//       recognitionInstance.onerror = (event) => {
//         console.error(`Error occurred in recognition: ${event.error}`);
//         setIsListening(false);
//       };

//       // recognitionInstance.onend = () => {
//       //   console.log("Voice recognition ended.");
//       //   setIsListening(false);
//       // };

//       setRecognition(recognitionInstance);
//       recognitionInstance.start();
//     } else {
//       recognition.start();
//       setIsListening(true);
//     }
//   };

//   if (hidden) {
//     return null;
//   }

//   return (
//     <>
//       <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
//         <div className="w-full flex flex-col items-end justify-center gap-4">
//           <button
//             onClick={() => setCameraZoomed(!cameraZoomed)}
//             className="pointer-events-auto bg-[#151518] border border-gray-700 hover:border-white text-white p-4 rounded-md"
//           >
//             {cameraZoomed ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//         <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
//           <input
//             className="w-full placeholder:text-white p-4 rounded-md bg-opacity-50 bg-black border backdrop-blur-md"
//             placeholder="Type a message..."
//             ref={input}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 sendMessage();
//               }
//             }}
//           />
//           <button
//             onClick={() => sendMessage()}
//             className="bg-[#151518] border-gray-700 font-poppins  hover:border-white text-white p-4 px-5 font-semibold uppercase rounded-md"
//           >
//             Send
//           </button>
//           <button
//             onClick={startListening}
//             className={`pointer-events-auto bg-[#151518] border-gray-700 hover:border-white text-white p-4 rounded-md ${
//               isListening ? "bg-[#0e0e10] border-white" : ""
//             }`}
//           >
//             {isListening ? (
//               <svg
//                 width="24px"
//                 height="24px"
//                 viewBox="-5 0 32 32"
//                 version="1.1"
//                 xmlns="http://www.w3.org/2000/svg"
//                 xmlns:xlink="http://www.w3.org/1999/xlink"
//                 xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
//                 fill="#000000"
//                 stroke="#000000"
//               >
//                 <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//                 <g
//                   id="SVGRepo_tracerCarrier"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 ></g>
//                 <g id="SVGRepo_iconCarrier">
//                   {" "}
//                   <title>microphone</title>{" "}
//                   <desc>Created with Sketch Beta.</desc>{" "}
//                   <defs> </defs>{" "}
//                   <g
//                     id="Page-1"
//                     stroke="none"
//                     strokeWidth="1"
//                     fill="none"
//                     fillRule="evenodd"
//                     sketch:type="MSPage"
//                   >
//                     {" "}
//                     <g
//                       id="Icon-Set-Filled"
//                       sketch:type="MSLayerGroup"
//                       transform="translate(-107.000000, -309.000000)"
//                       fill="#ffffff"
//                     >
//                       {" "}
//                       <path
//                         d="M118,333 C121.866,333 125,329.866 125,326 L125,316 C125,312.134 121.866,309 118,309 C114.134,309 111,312.134 111,316 L111,326 C111,329.866 114.134,333 118,333 L118,333 Z M129,328 L127,328 C126.089,332.007 122.282,335 118,335 C113.718,335 109.911,332.007 109,328 L107,328 C107.883,332.799 112.063,336.51 117,336.955 L117,339 L116,339 C115.448,339 115,339.448 115,340 C115,340.553 115.448,341 116,341 L120,341 C120.552,341 121,340.553 121,340 C121,339.448 120.552,339 120,339 L119,339 L119,336.955 C123.937,336.51 128.117,332.799 129,328 L129,328 Z"
//                         id="microphone"
//                         sketch:type="MSShapeGroup"
//                       >
//                         {" "}
//                       </path>{" "}
//                     </g>{" "}
//                   </g>{" "}
//                 </g>
//               </svg>
//             ) : (
//               <svg
//                 width="24px"
//                 height="24px"
//                 viewBox="-3.5 0 32 32"
//                 version="1.1"
//                 xmlns="http://www.w3.org/2000/svg"
//                 xmlns:xlink="http://www.w3.org/1999/xlink"
//                 xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
//                 fill="#000000"
//               >
//                 <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//                 <g
//                   id="SVGRepo_tracerCarrier"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 ></g>
//                 <g id="SVGRepo_iconCarrier">
//                   {" "}
//                   <title>microphone-off</title>{" "}
//                   <desc>Created with Sketch Beta.</desc> <defs> </defs>{" "}
//                   <g
//                     id="Page-1"
//                     stroke="none"
//                     strokeWidth="1"
//                     fill="none"
//                     fillRule="evenodd"
//                     sketch:type="MSPage"
//                   >
//                     {" "}
//                     <g
//                       id="Icon-Set-Filled"
//                       sketch:type="MSLayerGroup"
//                       transform="translate(-156.000000, -309.000000)"
//                       fill="#ffffff"
//                     >
//                       {" "}
//                       <path
//                         d="M169,335 C167.061,335 165.236,334.362 163.716,333.318 L162.31,334.742 C163.944,335.953 165.892,336.765 168,336.955 L168,339 L167,339 C166.448,339 166,339.448 166,340 C166,340.553 166.448,341 167,341 L171,341 C171.552,341 172,340.553 172,340 C172,339.448 171.552,339 171,339 L170,339 L170,336.955 C174.938,336.51 179.117,332.799 180,328 L178,328 C177.089,332.007 173.282,335 169,335 L169,335 Z M176,326 L176,320.739 L164.735,331.515 C165.918,332.432 167.386,333 169,333 C172.866,333 176,329.866 176,326 L176,326 Z M160.047,328.145 L160,328 L158,328 C158.109,328.596 158.271,329.175 158.478,329.733 L160.047,328.145 L160.047,328.145 Z M179.577,312.013 L155.99,334.597 L157.418,336.005 L181.014,313.433 L179.577,312.013 L179.577,312.013 Z M169,309 C165.134,309 162,312.134 162,316 L161.997,326.309 L175.489,313.401 C174.456,310.825 171.946,309 169,309 L169,309 Z"
//                         id="microphone-off"
//                         sketch:type="MSShapeGroup"
//                       >
//                         {" "}
//                       </path>{" "}
//                     </g>{" "}
//                   </g>{" "}
//                 </g>{" "}
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };
