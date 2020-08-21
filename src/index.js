// declaracion de variables
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

// set de variable
app.set("port", process.env.PORT || 3000); // process.env.PORT usar el puerto designado por heroku o 3000
//constantes

// variables globales
var contador = 0;

// arrays
var playersMap = [];
var playersArray = [];
var aux = []; // arreglo que se utilizará para almacenar objetos json

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
io.on("connection", function (socket) {
  // si alguien se conecta recibo la conexión socket
  console.log(
    "Se conectaron por socket. Su id: " + socket.id + " enviando saludo..."
  );
  var saludo = {
    id: socket.id,
    dato: "conexion establecida",
    player: 1,
    color: "white",
  };

  //añade el usuario a la lista de players en vector y diccionario
  playersMap[socket.id] = contador++;
  playersArray.push(socket.id);
  console.log(playersArray[contador-1]+" -> player numero: "+playersMap[socket.id]);             // Indice y numero de jugador
  
  if(playersMap[socket.id]%2 == 0){
    saludo.player = 1;
  }else{
    saludo.player = 2;
  }
  socket.emit("saludo", saludo); // se le envía el objeto saludo por defecto


  socket.on("res-message", function (messages) { // se reciben del cliente los msjs con identificador res-message
    
    console.log(socket.id + " -> { player: " + messages.player + ", color: " + messages.color + " }");
    var player = playersMap[socket.id];
    if(playersMap[socket.id]%2 == 0){
      player++;
      messages.player = 1;
    }else{
      player--;
      messages.player = 2;
    }
    var rival = playersArray[player];
    console.log(" -> Rival: "+ rival);            
    socket.to(socket.id).to(rival).emit("messages", data); //Le envia elmensaje a los dos players
  });

    socket.emit("message", data); // se utiliza para enviar mensaje al cliente
  });  
  
  socket.on("broadcast", function (data) {
    // se escucha en el socket un mensaje con solicitud de broadcast
    console.log(
      "Respondio con json: id: " + data.id + ", dato: " + data.dato + " , player: " + data.player
    );
    aux.push(data); // acumula los json recibidos en el arreglo aux
    console.log(
      "El cliente solicito que se haga Broadcast del json recibido..." // cliente envio msj con identificación "broadcast"
    );
    io.sockets.emit("broadcast", aux); // lo logico sería reenviarlo con la misma identificación a todos los clientes
  });

  // identifica cuando se ha desconectado un cliente
  socket.on("disconnecting", (reason) => {
    console.log("*" + socket.id + " = Se desconecto*, reason -> " + reason); //ID y razon de desconeccion
  });


// escucha peticiones en el puerto
server.listen(app.get("port"), function () {
  console.log("El servidor esta corriendo en el puerto", app.get("port"));
});
