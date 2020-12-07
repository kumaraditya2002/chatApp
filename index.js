const express = require('express');
const http = require('http');

const users = {};
// const port=3000;
// const host='localhost';

const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    req.status = 200;
    res.sendFile('index.html',{root:__dirname});
});

const io = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            // "Access-Control-Allow-Headers": "Content-Type, application/json",
            "Access-Control-Allow-Origin": '*',
            // "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

io.on('connection',socket => {
    socket.on('new-user-joined',name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]});
    });
 
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});

server.listen(8000);