const socket = io();

socket.on("connect", function () {
  console.log("Connected to server");

  socket.on("newMessage", function (message) {
    console.log(message);
  });

  socket.emit("createMessage", {from: "", text: ""});
});

socket.on("disconnect", function () {
  console.log("Disconnected from server");
});