const socket = io()
const chatForm = document.getElementById('chat-form');
const uploadForm = document.getElementById('upload-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const user = document.getElementById('username').innerHTML;
const room = document.getElementById('room').innerHTML;
const username = user
const activeroom = room
socket.emit('joinRoom',{username, room})
socket.on('message', message=>{
    outputMessage(message)
    chatMessages.scrollTop = chatMessages.scrollHeight
})


function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}
function outputMessages(message){
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerHTML = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}

