var socket = io();
socket.on('connect', function () {
    console.log('Server is Connected');

    // socket.emit('createMessage',{
    //     from:'Arslan',
    //     text:'Hey'
    // });
});
socket.on('disconnect', function () {
    console.log('Server is disconnected');
});

socket.on('newMessage', function (message) {
    console.log('Message:', message);
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

socket.on('newLocation',function(message){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(message.from+':');
    a.attr('href',message.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {

    });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('geolocation not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('unable to fetch the location');
    });
});

