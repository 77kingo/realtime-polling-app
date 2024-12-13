const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let pollData = { option1: 0, option2: 0, option3: 0 };

io.on("connection", (socket) => {
  console.log("A user connected");

  // Send current poll data to the connected client
  socket.emit("pollData", pollData);

  // Handle votes
  socket.on("vote", (option) => {
    if (pollData[option] !== undefined) {
      pollData[option]++;
      io.emit("pollData", pollData); // Update all clients
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
