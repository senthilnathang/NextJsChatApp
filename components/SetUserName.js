import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SetUsername = ({ username, setUsername, setIsUsernameSet }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-white px-4">
      <div className="p-10 rounded-xl flex flex-col justify-center items-center shadow-lg w-full max-w-lg bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Enter Your Username</h2>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full h-14 text-lg border rounded-lg mb-6 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={() => setIsUsernameSet(true)}
          disabled={!username.trim()}
          className={`w-52 h-10 text-lg rounded-lg transition ${
            username.trim()
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-black border-gray-500 cursor-not-allowed opacity-50"
          }`}
        >
          Set Username
        </Button>
      </div>
    </div>
  );
};

export default SetUsername;
