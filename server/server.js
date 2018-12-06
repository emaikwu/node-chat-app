const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path")

const {generateMessage} = require("./utils/message");

const app = express();
app.use(express.static(path.join(__dirname, "../public")));

const server = http.createServer(app);





const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New user connected");


  socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app."));
  socket.broadcast.emit("newMessage", generateMessage("Admin", "New user joined"));


  socket.on("createMessage", (message) => {
    io.emit("newMessage", message);
  })

  //On disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
    socket.broadcast.emit("newMessage", generateMessage("Admin", "A user has left"));
  })
})




const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Express is listening on port", port);  
})

