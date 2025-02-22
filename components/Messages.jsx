import React from "react";

const Messages = ({ msg, index }) => {
  return (
    <div>
      <div key={index} className="flex flex-col bg-white">
        <div
          className={`relative p-2.5 my-1 rounded-lg md:max-w-xs max-w-48 ${
            msg.sender === "You"
              ? "ml-auto border border-gray-400 text-right"
              : "mr-auto border border-gray-400 text-left"
          }`}
        >
          {msg.text}
        </div>
        <span
          className={`text-xs flex gap-2 text-gray-500 mt-1 uppercase font-medium ${
            msg.sender === "You" ? "ml-auto" : "mr-auto"
          }`}
        >
          {msg.time}
          {msg.sender === "You" && (
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
            >
              <path
                d="M5.801 4.88L6.507 5.586L10.74 1.353L11.447 2.06L6.507 7L3.325 3.818L4.032 3.111L5.0945 4.1735L5.801 4.8795V4.88ZM5.802 3.466L8.278 0.989502L8.983 1.6945L6.507 4.171L5.802 3.466ZM4.3885 6.2935L3.682 7L0.5 3.818L1.207 3.111L1.9135 3.8175L1.913 3.818L4.3885 6.2935Z"
                fill="#a1a1aa"
              ></path>
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default Messages;
