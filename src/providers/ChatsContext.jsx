// ChatContext.jsx
import { createContext, useState, useEffect } from 'react';
import ChatController from '../API/chat';
import { useParams, useNavigate } from 'react-router-dom';

export const ChatContext = createContext({
  sendPrompt: async () => {},
  setPrevPrompts: () => {},
  setRecentPrompt: () => {},
  setPrompt: () => {},
  startNewChat: () => {},
  setChatHistory: () => {},
  setPreview: ()=>{},
  refreshSideBar: false,
  prevPrompts: [],
  chatHistory: [],
  recentPrompt: '',
  prompt: '',
  isPending: false,
  isGenerating: false,
  output: [],
  showResult: false,
});

export const ChatContextProvider = ({ children }) => {
  let counter = 1;

  const params = useParams();
  const navigate = useNavigate();
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [preview,setPreview] = useState("")
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [chatId, setChatId] = useState('');
  const [refreshSideBar , setRefreshSideBar] = useState(false);


  // Function to create a new chat window and set chatId
  const handleNewChat = async (prompt,image,csv) => {
    console.log("calling handle new chat")
    if (counter === 1) {
      counter += 1;
      try {
        const response = await ChatController.createChatWindow();
        const newChatId = response.chatWindow._id;
        console.log('New chat created', response);
        setChatId(newChatId);
        setRecentPrompt('');
        setChatHistory([]);
        setOutput([]);
        setShowResult(false);
        navigate(`/chat/${newChatId}`);
        console.log("chat id after creating ", chatId)
        handleSendPrompt(prompt,image,csv, "jh",newChatId);
        setRefreshSideBar(true)

      } catch (err) {
        console.error('Failed to create a new chat:', err);
      }
    }
  };

  // Updated handleSendPrompt function to accept imagePreview
  const handleSendPrompt = async (newPrompt, image = null, csv = null, imagePreview = null , newChatId) => {
    let localChatId = newChatId || chatId

    console.log("new chat id " , newChatId)

    if (newChatId){
      console.log("chat id updated ", newChatId)
      setChatId(newChatId)
    }
    console.log('handleSendPrompt called with prompt:', newPrompt);
    console.log("chat id in handlesend prompt , ", chatId)
    console.log("image preview ", preview)
    if (!newPrompt.trim()) return;

    setIsGenerating(true);
    setIsPending(true);
    setRecentPrompt(newPrompt);
    setShowResult(true);

    // Add the new prompt to the previous prompts list
    setPrevPrompts((prev) => [...prev.filter((p) => p !== newPrompt), newPrompt]);

    // Add the prompt to the chat history with the image preview
    setChatHistory((prev) => [
      ...prev,
      {
        prompt: newPrompt,
        response: null,
        image_local_preview: preview,
      },
    ]);

    try {
      const formData = new FormData();
      formData.append('prompt', newPrompt);
      formData.append('chatId',  localChatId);

      // Append image and csv if they are provided
      if (image !== null) {
        console.log('Appending image to formData:', image);
        formData.append('image', image);
      }

      if (csv !== null) {
        console.log('Appending CSV to formData:', csv);
        formData.append('csv', csv);
      }

      // API call to get the chat response
      const response = await ChatController.handleChatRequest(formData);

      console.log('Chat response', response);
      setPreview(null)
      // Update the last message in the chat history with the server response
      if (response && response.chatWindow && response.chatWindow.messages) {
        const messages = response.chatWindow.messages;
        const lastMessageFromServer = messages[messages.length - 1];

        setChatHistory((prev) => {
          const updatedHistory = [...prev];
          const lastIndex = updatedHistory.length - 1;
          if (lastIndex >= 0) {
            updatedHistory[lastIndex] = {
              ...updatedHistory[lastIndex],
              response: lastMessageFromServer.response,
              plot_url: lastMessageFromServer.plot_url,
              image_url: lastMessageFromServer.image_url,
              timestamp: lastMessageFromServer.timestamp,
              // Remove image_local_preview now that image_url is available
              image_local_preview: null,
            };
            console.log('Updated chat history with server response:', updatedHistory[lastIndex]);
          }
          return updatedHistory;
        });
      } else {
        // Handle case where no valid response is returned
        console.error('No valid response from server:', response);
        setChatHistory((prev) => [
          ...prev,
          {
            prompt: newPrompt,
            response: `<span class="text-red-500">No response from server</span>`,
          },
        ]);
      }
    } catch (err) {
      console.error('Error while sending the prompt:', err);
      setChatHistory((prev) => [
        ...prev,
        {
          prompt: newPrompt,
          response: `<span class="text-red-500">Error occurred: ${err.message}</span>`,
        },
      ]);
    } finally {
      setPrompt('');
      setIsPending(false);
      setIsGenerating(false);
    }
  };

  // Function to fetch chat history
  const fetchChatHistory = async () => {
    try {
      if (chatId) {
        const response = await ChatController.getChatWindowById(chatId);
        console.log('Fetched chat history:', response);
        if (response && response.chatWindow && response.chatWindow.messages) {
          setChatHistory(response.chatWindow.messages);
          setPrevPrompts(response.chatWindow.messages.map((message) => message.prompt));
        }
      } else {
        console.error('No chatId available to fetch history');
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  // Fetch chat history on component mount or when chatId changes
  useEffect(() => {
    if (chatId) {
      fetchChatHistory();
    } else {
      handleNewChat();
    }
  }, [chatId]);

  return (
    <ChatContext.Provider
      value={{
        sendPrompt: handleSendPrompt,
        setPrevPrompts,
        setRecentPrompt,
        setPreview,
        setPrompt,
        startNewChat: handleNewChat,
        setChatHistory,
        refreshSideBar,
        chatId,
        prevPrompts,
        chatHistory,
        recentPrompt,
        prompt,
        isPending,
        isGenerating,
        output,
        showResult,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;










  // Function to send prompt, ensures chatId is created first if it doesn't exist
  // const handleSendPrompt = async (newPrompt) => {
  //   if (!newPrompt.trim()) return // Prevent sending empty prompts

  //   setIsGenerating(true)
  //   setIsPending(true)
  //   setRecentPrompt(newPrompt)
  //   setShowResult(true)

  //   // // Create chatId if it doesn't exist yet
  //   // if (!chatId) {
  //   //   await handleNewChat()
  //   // }

  //   // Add the new prompt to the previous prompts list
  //   setPrevPrompts((prev) => [
  //     ...prev.filter((p) => p !== newPrompt),
  //     newPrompt,
  //   ])

  //   // Add the prompt to the chat history
  //   setChatHistory((prev) => [
  //     ...prev,
  //     { prompt: newPrompt, response: null }, // Initial response is null
  //   ])

  //   try {
  //     const formData = new FormData()
  //     formData.append('prompt', newPrompt)
  //     formData.append('chatId', chatId)

  //     // Simulate running the chat prompt (this would be your actual API call)
  //     const { data, error } = await runChat(newPrompt);
  //     const response = await ChatController.handleChatRequest(formData);

  //     console.log("Chat response", response)

  //     // Handle error case
  //     if (!response) {
  //       setChatHistory((prev) => [
  //         ...prev,
  //         {
  //           prompt: newPrompt,
  //           response: `<span class="text-red-500">${error}</span>`,
  //         },
  //       ])
  //       setIsPending(false)
  //       setIsGenerating(false)
  //       return
  //     }

  //     // Format the response with strong tags and line breaks
  //     let formattedResponse = ''
  //     data.split('**').forEach((word, idx) => {
  //       if (idx % 2 === 0) {
  //         formattedResponse += word
  //       } else {
  //         formattedResponse  += `<strong>${word}</strong>`
  //       }
  //     })
  //     formattedResponse = formattedResponse.split('*').join('<br />')

  //     // Simulate typing effect by splitting the response into words
  //     const newOutput = []
  //     await Promise.all(
  //       formattedResponse
  //         .split(' ')
  //         .map((word, idx) => simulateTypingEffect(idx, word + ' ', newOutput))
  //     )

  //     const finalOutput = newOutput.join('')

  //     // Update chat history with the final response
  //     setChatHistory((prev) =>
  //       prev.map((entry, index) =>
  //         index === prev.length - 1 ? { ...entry, response: finalOutput } : entry
  //       )
  //     )

  //   } catch (err) {
  //     console.error('Error while sending the prompt:', err)
  //   } finally {
  //     setPrompt('')
  //     setIsPending(false)
  //     setIsGenerating(false)
  //   }
  // }