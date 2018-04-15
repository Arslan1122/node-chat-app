const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var generate_msg = require('./utils/message');
var generate_location = require('./utils/message');
const isString = require('./utils/validation');
const U = require('./utils/users');

var user = new U.Users();

app.use(express.static(publicPath));

io.on('connection', function (socket) {
    console.log('New User connected');


    socket.on('join', function (params, callback) {
        if (!isString.isRealString(params.name) || !isString.isRealString(params.room)) {
            return callback('Name and room name are required.');
        }
        socket.join(params.room);
        user.removeUser(socket.id);
        user.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',user.getUserList(params.room));
        //socket.leave()
        //io.emit ->io.to(roomName).emit //this will send the message only to the specific user who is in the group
       //socket.broadcast.emit ->socket.broadcast.to(roomName).emit  // This will show the message in the group of all the members that he join expect himself

        socket.emit('newMessage', generate_msg.generateMessage('Admin', 'Welcome to Chat App'));
        socket.broadcast.to(params.room).emit('newMessage', generate_msg.generateMessage('Admin', params.name +' Joined'));

        callback();
    });
    socket.on('createMessage', function (message, callback) {
        console.log('Message Created', message);

        // io.emit will show the message to all the users that connected to that link
        io.emit('newMessage', generate_msg.generateMessage(message.from, message.text));
        callback();
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

    socket.on('createLocationMessage', function (coords) {
        io.emit('newLocation', generate_location.generateLocation('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', function () {
        var u = user.removeUser(socket.id);
        if(u){
            io.to(u.room).emit('updateUserList',user.getUserList(u.room));
            io.to(u.room).emit('newMessage',generate_msg.generateMessage('Admin',u.name +' has Left'));
        }
        console.log('User was disconnected');
    });
});

server.listen(port, function () {
    console.log('Server is up on port ', port);
});


