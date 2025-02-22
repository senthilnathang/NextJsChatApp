import { useEffect, useState } from "react";
import Chat from "@/components/ChatBox";
import NavTopbar from "@/components/NavTopbar";
import Sidebar from "@/components/Sidebar";
import SetUsername from "@/components/SetUserName";
import io from "socket.io-client";

const socket = io({ path: "/api/socketio" });

export default function Home() {
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    socket.on("activeUsers", (users) => {
      setActiveUsers(users);
    });

    return () => socket.off("activeUsers");
  }, []);

  const handleSetUsername = () => {
    setIsUsernameSet(true);
    socket.emit("newUser", username);
  };

  console.log("aaaa", activeUsers);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation Bar */}
      <NavTopbar />

      {/* If username isn't set, show SetUsername screen */}
      {!isUsernameSet ? (
        <SetUsername
          username={username}
          setUsername={setUsername}
          setIsUsernameSet={handleSetUsername}
        />
      ) : (
        <div className="flex flex-grow">
          <div className="hidden md:block md:w-80 lg:w-96">
            <div className="border border-gray-200 rounded-md m-4 h-[90vh]">
              <Sidebar activeUsers={activeUsers} />
            </div>
          </div>

          {/* Chat Box (Full width on small screens, with sidebar space on larger screens) */}
          <div className="flex-grow w-full md:w-auto">
            <Chat username={username} />
          </div>
        </div>
      )}
    </div>
  );
}
