const express = require('express');
const app = express();
const http = require('http');
const { send } = require('process');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get('/post',(res,req)=>{
  res.send("connected");
});
  
app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});
io.on('connection', (socket) => {
  console.log(socket);
  socket.on('chat message', (msg) => {
    
    // io.emit('chat message', msg);
    socket.broadcast.emit('chat message',msg);
  });
  socket.on('broadcast',(data)=>{
    // io.emit('broadcast',data);
    socket.broadcast.emit('broadcast',data)
  })
});
// io.on('connection',(socket)=>{
//   console.log('socket connected')
// });

server.listen(4000, () => {
  console.log('listening \on *:4000');
});