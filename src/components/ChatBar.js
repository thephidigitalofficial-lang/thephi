import { showChatBox, updateQuery } from "@/redux/slices/chatSlice";
import { ArrowUp } from "lucide-react";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

export default function ChatBar() {
  const inputRef = useRef();
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="  fixed z-100 w-xl max-xl:w-full left-1/2 -translate-x-1/2 bottom-12  bg-[rgba(0,0,0,0.001)] rounded-[20px]"
    >
      <div className=" h-[86px] w-xl max-xl:w-full max-xl:px-6">
        <div className="relative w-full h-full bg-[rgba(0,0,0,0.001)] rounded-[20px]">
          <div
            className="absolute left-0 top-0 w-full h-full rounded-[20px]    bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
            style={{
              border: "2px solid rgba(72,72,72,0.5)",
              boxShadow: "0px 0px 25px rgba(0,0,0,0.1)",
              boxSizing: "border-box",
            }}
          />

          <div className="absolute left-0 pr-24 pl-4 top-[12.66px] w-full ">
            <textarea
              ref={inputRef}
              className="min-w-full   text-base text-white  h-full resize-none  "
              placeholder="Ask Anything"
            />
          </div>

          <button
            onClick={() => {
              if (inputRef.current.value.trim()) {
                dispatch(updateQuery(inputRef.current.value.trim()));
                dispatch(showChatBox(true));
              }
            }}
            className="absolute cursor-pointer right-6 bg-white border border-[#EBEBEB] top-[20px] w-[48px] h-[45px] rounded-[10px] flex items-center justify-center"
            aria-label="send"
          >
            <ArrowUp color="#AAAAAA" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
