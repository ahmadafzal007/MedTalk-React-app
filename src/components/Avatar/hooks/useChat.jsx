import { createContext, useContext, useEffect, useState } from "react";

// Define audio and transcript file names
const filePrefixes = {

  "8.Intro": {
    audio: "introduction.wav",
    transcript: "7.sorry.json",
  },
};

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const [message, setMessage] = useState(null);

  // Fetch base64 encoded audio file
  const getBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Fetch JSON transcript
  const fetchJson = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  // Process user chat message
  const chat = async (userMessage) => {
    setLoading(true);

    let filePrefix = "8.Intro"; // Default to "7.sorry" if no matching prefix found

    if (userMessage && userMessage.trim() !== "") {
      const messageLowerCase = userMessage.toLowerCase();
      if (messageLowerCase.includes("Introduce") || messageLowerCase.includes("Hello")) {
        filePrefix = "8.Intro";
      }
    }

    const fileName = filePrefixes[filePrefix];
    const audioUrl = `./audios/${fileName.audio}`;
    const transcriptUrl = `./audios/${fileName.transcript}`;

    const message = {
      text: filePrefix === "7.sorry" ? "Sorry, I couldn't understand that." : `Playing audio for ${filePrefix.replace(/\d\./, '').replace(/\./g, ' ')}`,
      audio: await getBase64(audioUrl),
      lipsync: await fetchJson(transcriptUrl),
      facialExpression: "smile",
      animation: "Idle",
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    setLoading(false);
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  const onMessagePlayed = () => {
    setMessages((prevMessages) => prevMessages.slice(1));
  };

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
