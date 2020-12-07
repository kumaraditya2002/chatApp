const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageinp = document.getElementById('messageinp');
const messageConatiner = document.querySelector('.container');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const message = messageinp.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageinp.value='';
});

const name = prompt('Hi please enter your name to join!');
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');
});
socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`,'left');
});

const append = (message,pos)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(pos);
    messageConatiner.append(messageElement);
}