const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname , '../public');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',function(socket){
    console.log('New User connected');

    socket.on('createMessage',function(message){
        // console.log('Message Created',message);

        // io.emit will show the message to all the users that connected to that link
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        });
    });

    // socket.emit('newMessage',{
    //     from:'jhon',
    //     message:'Message from server'
    // });



    socket.on('disconnect',function(){
        console.log('User was disconnected');
    });
});

server.listen(port,function(){
    console.log('Server is up on port ',port);
});


