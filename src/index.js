// declaracion de variables
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

// set de variable
app.set("port", process.env.PORT || 3000); // process.env.PORT usar el puerto designado por heroku o 3000
//constantes


//variables glovales
var contador = 0;

//arrays
var playersMap = [];
var playersArray = [];

// objeto por defecto
var messages = {
  player: "1",
  color: "white",
};

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.status(200).send("Hello Mundo!");
});

// establecimiento de la conexion
io.on("connection", function (socket) { // si alguien se conecta recibo la conexión socket
  console.log("Alguien se conectó con socket: "+socket.id);    // si alguien se conecta se imprime por consola el id
  
  //añade el usuario a la lista de players en vector y diccionario
  playersMap[socket.id] = contador++;
  playersArray.push(socket.id);
  console.log(playersArray[contador-1]+" -> player numero: "+playersMap[socket.id]);             // Indice y numero de jugador
  
  if(playersMap[socket.id]%2 == 0){
    messages.player = 1;
  }else{
    messages.player = 2;
  }
  socket.emit("numeroplayer", messages);                    // se le envía el objeto por defecto con el identificador messages                                                      
  //socket.emit("messages", messages);                    // se le envía el objeto por defecto con el identificador messages                                                     
  //socket.to(socket.id).emit("playernumber", messages.player);
  ////////comunicacion con el usuario
  socket.on("new-message", function (messages) { // si escucha en el socket un mensaje
    console.log(socket.id+" -> { player: "+messages.player+", color: "+messages.color+" }");             // ID y mensaje
    //io.sockets.emit("messages", messages);              // emito el cambio a todos los clientes
    var player = playersMap[socket.id];
    var rival = "";
    if(playersMap[socket.id]%2 == 0){
      player++;
      messages.player = 1;
    }else{
      player--;
      messages.player = 2;
    }
    rival = playersArray[player];
    console.log(" -> Rival: "+rival);             // ID y mensaje
    socket.to(socket.id).to(rival).emit("messages", messages);
  });

  ////////desconeccion del usuario
  socket.on('disconnecting', (reason) => { //identifica cuando se a desconectado
    console.log("*"+socket.id+" = Se desconecto*, reason -> "+reason); //ID y razon de desconeccion   
  });
});

// escucha peticiones en el puerto
server.listen(app.get("port"), function () {
  console.log("El servidor corriendo en puerto", app.get("port"));
});
