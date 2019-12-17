const socket=io("http://localhost:3000/")
const messageForm = document.getElementById("send-container")
const messageInput=document.getElementById("message-input")
const messageContainer = document.getElementById("message-container")


const name = prompt("Give a name:")

appendMsg('You joined')
socket.emit("new-user",name)

socket.on("user-connected",name =>{
    appendMsg(`${name} connected`)
})

socket.on("chat-message",data =>{
    appendMsg(`${data.name}: ${data.message}`)
})

socket.on("user-disconnected",name=>{
    appendMsg(`${name} disconnected`)
})


messageForm.addEventListener("submit",e=>{
    e.preventDefault()
    const message=messageInput.value
    appendMsg(`You: ${message}`)
    socket.emit("send-chat-message",message)
    messageInput.value=""
})

function appendMsg(msg){
    const msgElement=document.createElement('div')
    msgElement.innerText=msg
    messageContainer.append(msgElement)
}