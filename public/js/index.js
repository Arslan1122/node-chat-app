var socket = io();
socket.on('connect',function(){
    console.log('Server is Connected');

    // socket.emit('createMessage',{
    //     from:'Arslan',
    //     text:'Hey'
    // });
});

socket.on('newMessage',function(message){
    console.log('Message:',message);
});

socket.on('disconnect',function(){
    console.log('Server is disconnected');
});
