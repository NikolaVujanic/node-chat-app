var socket = io();
var $ = jQuery;

socket.on('connect', function() {
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if(err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error!');
        }
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server!');
});

socket.on('updateUserList', function(users) {
    var ol = $('<ol></ol>');

    users.forEach(function(user) {
        ol.append($('<li></li>').text(user));
    });
    
    $('#users').html(ol);
});

socket.on('newMessage', function(message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });
    $('#messages').append(html);
});

socket.on('newLocationMessage', function(message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        url: message.url,
        createdAt: formatedTime
    });
    $('#messages').append(html);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

var locationBtn = $('#send-location');
locationBtn.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported!');
    }

    locationBtn.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationBtn.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationBtn.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location!');
    });
});
