
const server = require('http').createServer();
const io=require("socket.io")(server)

const users={}

io.on('connection',socket=>{
    console.log("New User")

    socket.on("send-chat-message",msg=>{
        socket.broadcast.emit("chat-message",{message:msg,name:users[socket.id]})
    })

    socket.on("new-user",name=>{
       users[socket.id] = name
       socket.broadcast.emit("user-connected",name)
    })

    socket.on("disconnect",()=>{
        socket.broadcast.emit("user-disconnected",users[socket.id])
        delete users[socket.id]
    })
})
server.listen(3000);