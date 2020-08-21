// declaracion de variables
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

// set de variable
app.set("port", process.env.PORT || 3000); // process.env.PORT usar el puerto designado por heroku o 3000

// variables globales
var aux = []; // arreglo que se utilizará para almacenar objetos json

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
  };
  socket.emit("saludo", saludo); // se le envía el objeto saludo por defecto

  socket.on("res-message", function (data) { // se reciben del cliente los msjs con identificador res-message
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
});

// escucha peticiones en el puerto
server.listen(app.get("port"), function () {
  console.log("El servidor esta corriendo en el puerto", app.get("port"));
});
