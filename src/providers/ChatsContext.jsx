import { createContext, useState } from 'react';
import { runChat } from '../libs/gemini';

export const ChatContext = createContext({
	sendPrompt: async () => {},
	setPrevPrompts: () => {},
	setRecentPrompt: () => {},
	setPrompt: () => {},
	startNewChat: () => {},
	prevPrompts: [],
	recentPrompt: '',
	prompt: '',
	isPending: false,
	isGenerating: false,
	output: '',
	showResult: false,
});

export const ChatContextProvider = ({ children }) => {
	const [prevPrompts, setPrevPrompts] = useState([]);
	const [recentPrompt, setRecentPrompt] = useState('');
	const [prompt, setPrompt] = useState('');
	const [isPending, setIsPending] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);
	const [output, setOutput] = useState('');
	const [showResult, setShowResult] = useState(false);

	const handleNewChat = () => {
		setRecentPrompt('');
		setOutput('');
		setShowResult(false);
	};

	const handleSendPrompt = async (prompt) => {
		setIsGenerating(true);
		setIsPending(true);
		setRecentPrompt(prompt);
		setShowResult(true);

		setPrevPrompts((prev) => [...prev.filter((p) => p !== prompt), prompt]);

		const { data, error } = await runChat(prompt);
		let formattedResponse = '';

		if (error) {
			setOutput(`<span class="text-red-500">${error}</span>`);
			setIsPending(false);
			setIsGenerating(false);
			setShowResult(true);

			return;
		}

		data.split('**').forEach((word, idx) => {
			if (idx === 0 || idx % 2 === 0) {
				formattedResponse += word;
			} else {
				formattedResponse += `<strong>${word}</strong>`;
			}
		});

		formattedResponse = formattedResponse.split('*').join('<br />');

		setOutput('');
		setIsPending(false);

		await Promise.all(
			formattedResponse
				.split(' ')
				.map((word, idx) => simulateTypingEffect(idx, word + ' ')),
		);

		setPrompt('');
		setIsGenerating(false);
	};

	const simulateTypingEffect = (idx, nextWord) =>
		new Promise((resolve) =>
			setTimeout(() => {
				setOutput((prev) => prev + nextWord);
				resolve();
			}, 40 * idx),
		);

	return (
		<ChatContext.Provider
			value={{
				sendPrompt: handleSendPrompt,
				setPrevPrompts,
				setRecentPrompt,
				setPrompt,
				startNewChat: handleNewChat,
				prevPrompts,
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