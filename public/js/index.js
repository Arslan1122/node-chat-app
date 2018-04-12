var socket = io();
socket.on('connect',function(){
    console.log('Server is Connected');

    // socket.emit('createMessage',{
    //     from:'Arslan',
    //     text:'Hey'
    // });
});
socket.on('disconnect',function(){
    console.log('Server is disconnected');
});

socket.on('newMessage',function(message){
    console.log('Message:',message);
    var li = $('<li></li>');
    li.text(message.from + ':' + message.text);
    $('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:'Ali',
//     text:"message from ali"
// },function (data) {                // event acknowledgement
//     console.log('Got it',data); // data comes from callback in the server js listner
// });

$('#message-form').on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text:$('[name=message]').val()
    },function () {

    });

});
