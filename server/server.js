const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname , '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var generate_msg = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection',function(socket){
    console.log('New User connected');

    socket.emit('newMessage',generate_msg.generateMessage('Admin','Welcome to Chat App'));

    socket.broadcast.emit('newMessage',generate_msg.generateMessage('Admin','New User Joined'));

    socket.on('createMessage',function(message,callback){
        console.log('Message Created',message);

        // io.emit will show the message to all the users that connected to that link
        io.emit('newMessage',generate_msg.generateMessage(message.from,message.text));
        callback('This is From server');
        //If we want to show message only to others and not to show himself then we use broadcast

        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // });
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


