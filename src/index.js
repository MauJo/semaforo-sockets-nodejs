var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



var messages = { 
    color: "white"
};

app.use(express.static('public'));

app.get('/', function(req, res){
    res.status(200).send("Hello Mundo!");
});

io.on('connection', function(socket){
    console.log('Alguien se ha conectado con socket');
    socket.emit('messages', messages);

    socket.on('new-message', function(data){
        messages.color = data;
        io.sockets.emit('messages', messages);
    });

});


server.listen(3000, function() {
    console.log('El servidor corriendo en http://localhost:3000');

});