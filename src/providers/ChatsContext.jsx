import { createContext, useState } from 'react'
import { runChat } from '../libs/gemini'

export const ChatContext = createContext({
  sendPrompt: async () => {},
  setPrevPrompts: () => {},
  setRecentPrompt: () => {},
  setPrompt: () => {},
  startNewChat: () => {},
  prevPrompts: [],
  chatHistory: [], // Store entire conversation (prompt and response)
  recentPrompt: '',
  prompt: '',
  isPending: false,
  isGenerating: false,
  output: [],
  showResult: false,
})

export const ChatContextProvider = ({ children }) => {
  const [prevPrompts, setPrevPrompts] = useState([])
  const [chatHistory, setChatHistory] = useState([]) // Stores prompts and responses
  const [recentPrompt, setRecentPrompt] = useState('')
  const [prompt, setPrompt] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [output, setOutput] = useState([]) // Store output for each message
  const [showResult, setShowResult] = useState(false)

  const handleNewChat = () => {
    setRecentPrompt('')
    setChatHistory([]) // Clear the entire conversation for a new chat
    setOutput([])
    setShowResult(false)
  }

  const handleSendPrompt = async (newPrompt) => {
    setIsGenerating(true)
    setIsPending(true)
    setRecentPrompt(newPrompt)
    setShowResult(true)

    // Add new prompt to previous prompts, avoiding duplicates
    setPrevPrompts((prev) => [
      ...prev.filter((p) => p !== newPrompt),
      newPrompt,
    ])

    // Add new prompt to chat history
    setChatHistory((prev) => [
      ...prev,
      { prompt: newPrompt, response: null }, // Response is null initially
    ])

    const { data, error } = await runChat(newPrompt)
    let formattedResponse = ''

    if (error) {
      setChatHistory((prev) => [
        ...prev,
        {
          prompt: newPrompt,
          response: `<span class="text-red-500">${error}</span>`,
        },
      ])
      setIsPending(false)
      setIsGenerating(false)
      return
    }

    // Format the response with strong tags and line breaks
    data.split('**').forEach((word, idx) => {
      if (idx === 0 || idx % 2 === 0) {
        formattedResponse += word
      } else {
        formattedResponse += `<strong>${word}</strong>`
      }
    })

    formattedResponse = formattedResponse.split('*').join('<br />')
    setIsPending(false)

    const newOutput = []
    await Promise.all(
      formattedResponse
        .split(' ')
        .map((word, idx) => simulateTypingEffect(idx, word + ' ', newOutput))
    )

    const finalOutput = newOutput.join('')

    // Update the chat history with the final response
    setChatHistory((prev) =>
      prev.map((entry, index) =>
        index === prev.length - 1 ? { ...entry, response: finalOutput } : entry
      )
    )

    setPrompt('')
    setIsGenerating(false)
  }

  const simulateTypingEffect = (idx, nextWord, outputArray) =>
    new Promise((resolve) =>
      setTimeout(() => {
        outputArray.push(nextWord)
        resolve()
      }, 40 * idx)
    )

  return (
    <ChatContext.Provider
      value={{
        sendPrompt: handleSendPrompt,
        setPrevPrompts,
        setRecentPrompt,
        setPrompt,
        startNewChat: handleNewChat,
        prevPrompts,
        chatHistory, // Entire conversation is here
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
  )
}

export default ChatContext
