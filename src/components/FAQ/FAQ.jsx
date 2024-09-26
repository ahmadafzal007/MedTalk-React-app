import React, { useState } from "react";

const FAQ = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAccordion = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const faqs = [
    {
      question: "What is MedTalk?",
      answer:
        "MedTalk is an advanced medical chatbot that uses natural language processing (NLP) and image recognition to quickly diagnose and provide reliable healthcare information. It’s designed to assist both medical professionals and the general public by facilitating faster, more accurate medical responses.",
    },
    {
      question: "How does MedTalk diagnose health issues?",
      answer:
        "MedTalk employs AI-driven image recognition to analyze X-rays and ECGs, identifying potential health issues such as lung and heart diseases. By automating the analysis, MedTalk reduces the dependency on manual diagnosis, increasing accuracy and reducing response times.",
    },
    {
      question: "Is MedTalk free to use?",
      answer:
        "MedTalk offers various functionalities for free, especially for basic health inquiries and certain diagnostic assistance. However, more advanced features and detailed analyses may require a subscription.",
    },
    {
      question: "How secure is my data with MedTalk?",
      answer:
        "MedTalk prioritizes user privacy and data security. All personal health information is securely stored and processed in compliance with relevant healthcare data protection regulations to ensure your data is handled with the utmost confidentiality.",
    },
    {
      question: "Can MedTalk identify all types of lung and heart diseases?",
      answer:
        "MedTalk is proficient in identifying common and several complex lung and heart conditions. However, for rare or atypical cases, further medical evaluation by a healthcare professional is recommended.",
    },
    {
      question: "How does MedTalk help in continuous medical education?",
      answer:
        "MedTalk provides a platform for medical professionals to access up-to-date medical information and continuous learning opportunities, enhancing their knowledge and skills in diagnostics and patient care.",
    },
    {
      question: "Can MedTalk provide emergency medical advice?",
      answer:
        "While MedTalk is equipped to provide immediate information and preliminary assessments, it is not a substitute for professional medical advice, especially in emergency situations. Always consult with a healthcare professional for emergencies.",
    },
    {
      question: "What technologies power MedTalk?",
      answer:
        "MedTalk is powered by cutting-edge technologies including natural language processing, image recognition, and machine learning, enabling it to process visual and textual prompts accurately and learn from interactions to improve its responses.",
    },
    {
      question: "Can I access MedTalk from anywhere?",
      answer:
        "Yes, MedTalk is a web-based platform that can be accessed from any device with internet connectivity, ensuring you can obtain medical guidance anytime and anywhere.",
    },
    {
      question: "How does MedTalk improve healthcare efficiency?",
      answer:
        "By reducing the time needed for initial diagnostics and routine inquiries, MedTalk allows healthcare professionals to focus more on patient care and complex cases, thereby improving the overall efficiency of healthcare delivery.",
    },
  ];

  return (
    <div className="hh-custom-height w-full bg-black text-white    overflow-hidden  ">
      <div className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="flex justify-center md:col-span-2">
            <div className="max-w-xs">
              <h2 className=" text-[90px] ml-[10px] md:ml-0 font-bold text-white  leading-tight tracking-wide">
                FAQ!
              </h2>
              <div>
                {/* Insert your video component or video player here */}
                {/* Example of HTML5 video player */}
                <video
                  className="w-1/2 h-1/2 mt-10 ml-20 md:ml-5 hidden md:block"
                  loop
                  autoPlay
                  muted
                >
                  <source src="xrayVid.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 ">
            <div className="hs-accordion-group divide-y divide-gray-600">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`hs-accordion pt-6 pb-3 ${
                    openIndexes.includes(index) ? "active" : ""
                  }`}
                  id={`hs-accordion-heading-${index}`}
                >
                  <button
                    className="hs-accordion-toggle font-poppins font-semibold group pb-3 inline-flex items-center justify-between gap-x-3 w-full text-base md:text-md  p-3  text-start text-white rounded-lg  text-glow"
                    aria-controls={`hs-accordion-collapse-${index}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    {faq.question}
                    <svg
                      className={`hs-accordion-active:${
                        !openIndexes.includes(index) ? "hidden" : "block"
                      } block flex-shrink-0 size-5 text-gray-400 group-hover:text-gray-300`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        d={
                          openIndexes.includes(index)
                            ? "m18 15-6-6-6 6"
                            : "m6 9 6 6 6-6"
                        }
                      />
                    </svg>
                  </button>
                  <div
                    id={`hs-accordion-collapse-${index}`}
                    className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                      openIndexes.includes(index) ? "" : "hidden"
                    }`}
                    aria-labelledby={`hs-accordion-heading-${index}`}
                  >
                    <p className="text-white text-sm font-light font-poppins text-start">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
