import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { showAuthDialog } from "@/redux/slices/authSlice";
import {
  addUserMessage,
  sendChatRequest,
  showChatBox,
} from "@/redux/slices/chatSlice";

const Message = ({ text, sender, isNew }) => {
  const isUser = sender === "user";
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      layout
      variants={isNew ? messageVariants : {}}
      initial={isNew ? "hidden" : false}
      animate="visible"
      className={`flex mb-4 items-end ${isUser ? "justify-end" : "justify-start"
        }`}
    >
      <div
        className={`  p-2 rounded-lg   ${isUser ? " bg-[#F3F3F3] text-[#1D1D20] font-regular " : "bg-white  "
          }`}
      >
        {isUser ? <p>{text}</p> : <Markdown>{text}</Markdown>}
      </div>
    </motion.div>
  );
};

export default function ChatBox({ onClose, message }) {
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const conatinerRef = useRef();
  const dispatch = useDispatch();

  const {
    chat: { data: { messages = [] } = {}, loading: isLoading },
    conversationId,
  } = useSelector((state) => state.chatSlice);

  useEffect(() => {
    scrollToId("chat" + 2);
  }, []);

  useEffect(() => {
    if (messages?.length) {
      scrollToId("chat" + (messages.length - 1));
    }
  }, [messages]);

  const checkAuthStatus = (e, customInput) => {
    const aiMessages = messages.filter((item) => item.sender == "ai");
    const token = window.localStorage.getItem("token") || "";
    if (e) {
      e.preventDefault();
    }
    if (aiMessages.length >= 6 && !token) {
      dispatch(showAuthDialog(true));

      const intervalId = setInterval(() => {
        const newToken = window.localStorage.getItem("token");
        if (newToken) {
          clearInterval(intervalId);
          handleSendMessage(e, customInput);
          return;
        }
      }, 500);

      return;
    }
    handleSendMessage(e, customInput);
  };

  const handleSendMessage = async (e, customInput) => {
    try {
      if (!(input || (customInput ?? "")).trim() || isLoading) return;
      const userMessage = {
        id: Date.now(),
        text: input || (customInput ?? ""),
        sender: "user",
      };
      dispatch(addUserMessage(userMessage));
      dispatch(
        sendChatRequest({
          query: input || customInput,
          conversationId: conversationId ?? "",
        })
      );
      setInput("");
    } catch (error) {
      alert(error + "");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      checkAuthStatus(e);
    }
  };

  const scrollToId = (id) => {
    const container = document.getElementById("scontainer");
    const el = document.getElementById(id);
    if (container && el) {
      container.scrollTo({
        top: el.offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (message) {
      checkAuthStatus(null, message);
    }
  }, [message]);

  return (
    <div
      ref={conatinerRef}
      className="rounded-[20px] scrollbar-hide m-6 text-gray-800 bg-white 
      xl:h-[calc(100vh-40px)]
      max-xl:h-[calc(100vh-80px)] h-full    flex flex-col relative"
    >
      <main className="flex-1 overflow-y-auto   p-4 space-y-4 mb-20">
        <div
          id="scontainer"
          ref={chatEndRef}
          className="h-full pb-20 scrollbar-hide overflow-scroll"
        >
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <div key={"chat" + index} id={"chat" + index}>
                <Message
                  key={message.id}
                  text={message.text}
                  sender={message.sender}
                  isNew={message.isNew}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>
        {isLoading && (
          <div className="flex justify-start">
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-2 rounded-xl max-w-xl"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-xl animate-bounce"
                  style={{ animationDelay: "0s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-xl animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-xl animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <footer className="absolute rounded-b-xl bottom-0 left-0 right-0 p-4 md:p-6 bg-white">
        <form
          onSubmit={checkAuthStatus}
          className="flex items-center min-h-28 space-x-4 mx-auto shadow rounded-xl  "
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything"
            className="flex-1 p-3 md:p-4 focus:outline-none focus:ring-none  text-gray-900   transition-colors"
          />
          <div className="flex flex-col items-end absolute top-1/2 right-12 -translate-y-1/2 ">
            {isLoading ? (
              <div className="flex items-center justify-center w-fit p-3 border border-[#EBEBEB] rounded-xl bg-white">
                <div className="w-5 h-5 border-2 border-t-gray-300 border-gray-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <motion.button
                type="submit"
                whileTap={{ scale: 0.95 }}
                className="border border-[#EBEBEB] w-fit cursor-pointer rounded-xl p-3 bg-white"
              >
                <ArrowUp className=" text-black" />
              </motion.button>
            )}
            <p
              onClick={() => {
                dispatch(showChatBox(false));
                onClose();
              }}
              className="border border-[#EBEBEB] text-[#444444]  rounded-lg cursor-pointer mt-4 p-2 text-[11px] "
            >
              Minimize
            </p>
          </div>
        </form>
      </footer>
    </div>
  );
}
