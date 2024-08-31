import { CircleHelp, History, Menu, Plus, Settings } from "lucide-react";
import { useContext, useState } from "react";
import ChatContext from "../../providers/ChatsContext";
import RecentChatItem from "./RecentChatItem";
import SidebarMenuItem from "./SidebarMenuItem";

const Sidebar = () => {
  const {
    sendPrompt,
    setRecentPrompt,
    startNewChat,
    prevPrompts,
    isGenerating,
  } = useContext(ChatContext);

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebarExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await sendPrompt(prompt);
  };

  return (
    <div
      className={`hidden z-3 font-inconsolata h-screen flex-col justify-between bg-[#131314] text-white px-4 py-6 sm:inline-flex backdrop-blur-lg shadow-xl transform transition-all ${
        isExpanded ? "w-60" : "w-[4.75rem]"
      }`}
      style={{
        boxShadow: "inset 0 0 15px rgba(255, 255, 255, 0.1), 0 4px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)",
        transitionDuration: "400ms",
        transitionTimingFunction: "ease-in-out",
      }}
    >
      <div>
        <button
          onClick={toggleSidebarExpand}
          className="grid bg-black place-items-center rounded-full p-3 hover:bg-gray-900/80 transition-all ease-in-out transform hover:scale-110 shadow-lg text-white"
          style={{
            transitionDuration: "400ms",
            transitionTimingFunction: "ease-in-out",
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
          }}
        >
          <Menu size={20} />
        </button>

        <div
          onClick={!isGenerating ? startNewChat : undefined}
          className={`mt-10 bg-black inline-flex h-11 cursor-pointer items-center gap-2 rounded-full p-3 text-sm text-white font-semibold duration-300 transition-all ease-in-out transform ${
            isExpanded ? "w-[8rem]" : "w-11"
          } hover:scale-105 shadow-lg`}
          style={{
            transitionDuration: "400ms",
            transitionTimingFunction: "ease-in-out",
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
          }}
        >
          <Plus className="min-w-4" size={20} />
          <p
            className={`line-clamp-1 text-white font-thin  duration-300 ${
              !isExpanded ? "opacity-0" : ""
            }`}
          >
            New Chat
          </p>
        </div>

        {isExpanded && (
          <div className="animate-fade-in flex flex-col mt-6">
            <p className="my-4 ml-1 text-white">Recent</p>

            <div className="space-y-3">
              {prevPrompts
                .slice()
                .reverse()
                .map((prompt, idx) => (
                  <RecentChatItem
                    key={`${prompt} - ${idx}`}
                    onClick={
                      !isGenerating ? () => loadPrompt(prompt) : undefined
                    }
                    label={prompt}
                    className="text-white"
                  />
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-3">
        {[
          // Add your menu items here
        ].map(({ label, icon }, idx) => (
          <SidebarMenuItem
            key={idx}
            Icon={icon}
            label={label}
            isExpanded={isExpanded}
            className={`text-white transition-transform ease-in-out ${
              isExpanded ? "translate-x-0" : "-translate-x-3"
            } hover:scale-110`}
            style={{
              transitionDuration: "400ms",
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
