var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 3000);

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


server.listen(app.get('port'), function() {
    console.log('El servidor corriendo en puerto', app.get('port'));

});