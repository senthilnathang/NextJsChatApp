import { useEffect, useState } from "react";
import io from "socket.io-client";
import Messages from "./Messages";
import SendInput from "./SendInput";
import Topbar from "./Topbar";

const socket = io({
  path: "/api/socketio",
  transports: ["websocket", "polling"],
});

export default function Chat({ username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", ({ sender, text }) => {
      if (sender === socket.id) return;
      setMessages((prev) => [...prev, { sender, text }]);
    });

    return () => socket.off("message");
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const msgData = {
      sender: socket.id,
      text: message,
      time: timestamp,
    };

    socket.emit("message", msgData);

    setMessages((prev) => [
      ...prev,
      { sender: "You", text: message, time: timestamp },
    ]);

    setMessage("");
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="mx-auto w-full max-w-full py-4 bg-white">
        <Topbar username={username} />
        <div className="md:h-[680px] h-[650px] overflow-y-auto bg-white p-2 md:mx-0 mx-2 rounded mb-4">
          {messages.map((msg, index) => (
            <Messages key={index} msg={msg} />
          ))}
        </div>
        <SendInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}
