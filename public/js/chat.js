var socket = io();
socket.on('connect', function () {

    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
    // socket.emit('createMessage',{
    //     from:'Arslan',
    //     text:'Hey'
    // });
});
socket.on('disconnect', function () {
    console.log('Server is disconnected');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('Message:', message);
    var li = $('<li></li>');
    li.text(message.from + ' ' + formattedTime +' : ' + message.text);
    $('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:'Ali',
//     text:"message from ali"
// },function (data) {                // event acknowledgement
//     console.log('Got it',data); // data comes from callback in the server js listner
// });

socket.on('newLocation',function(message){
    var formatTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(message.from+ ' '+ formatTime +':');
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
        $('[name=message]').val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('geolocation not supported by your browser');
    }
    locationButton.attr('disabled','disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('unable to fetch the location');
    });
});

