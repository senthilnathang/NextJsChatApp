import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      path: "/api/socketio",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("A user connected", socket.id);

      socket.on("message", (data) => {
        io.emit("message", data);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
