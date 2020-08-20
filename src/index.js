// declaracion de variables
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

// set de variable
app.set("port", process.env.PORT || 3000); // process.env.PORT usar el puerto designado por heroku o 3000

//variables glovales


// objeto por defecto
var messages = {
  color: "white",
  player: "1",
};

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.status(200).send("Hello Mundo!");
});

// establecimiento de la conexion
io.on("connection", function (socket) { // si alguien se conecta recibo la conexión socket
  console.log("Alguien se conectó con socket: "+socket.id);    // si alguien se conecta se imprime por consola el id
  /*var messages = {
    id: socket.id,
    player: "Conexión establecida",
  };*/
  socket.emit("messages", messages);                    // se le envía el objeto por defecto con el identificador messages
                                                        

  socket.on("new-message", function (messages) { // si escucha en el socket un mensaje
    console.log(socket.id+" -> { player: "+messages.player+", color: "+messages.color+" }");             // ID y mensaje                             // con el identificador recibo en data y reemplazo el objeto
    io.sockets.emit("messages", messages);              // emito el cambio a todos los clientes
  });

  socket.on('disconnecting', (reason) => { //identifica cuando se a desconectado
    console.log("*"+socket.id+" = Se desconecto*, reason -> "+reason); //ID y razon de desconeccion   
  });
});

// escucha peticiones en el puerto
server.listen(app.get("port"), function () {
  console.log("El servidor corriendo en puerto", app.get("port"));
});
