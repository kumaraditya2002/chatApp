const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageinp = document.getElementById('messageinp');
const messageConatiner = document.querySelector('.container');
var audio = new Audio('ting.mp3');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const message = messageinp.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageinp.value='';
});

const name = prompt('Hi please enter your name to join!');
messageConatiner.innerHTML = `<h3 style="text-align:center;">Hey ${name} add your freinds to chat!<h3>`
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');
});
socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`,'left');
});
socket.on('left',name=>{
    append(`${name} left the chat!`,'left');
});

const append = (message,pos)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(pos);
    messageConatiner.append(messageElement);
    if(pos === 'left')
        audio.play();
}