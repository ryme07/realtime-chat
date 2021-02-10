const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// run when client connect
io.on("connection", (socket) => {
  console.log("New WS connection...");

  const botName = "chatCord bot";

  //welcome current user
  socket.emit("message", formatMessage(botName, "welcome to chatcord!"));

  //broadcast whe a user connects
  socket.broadcast.emit(
    "message",
    formatMessage(botName, "A user has joined the chat")
  );

  // runs when client disconnect
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });

  //listen for chatMessage
  socket.on("chatMessage", (msg) => {
    io.emit("message", formatMessage("USER", msg));
  });
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
