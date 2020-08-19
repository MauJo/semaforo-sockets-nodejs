// declaracion de variables
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

// set de variable
app.set("port", process.env.PORT || 3000); // process.env.PORT usar el puerto designado por heroku

// objeto por defecto
var messages = {
  color: "white",
};

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.status(200).send("Hello Mundo!");
});

// establecimiento de la conexion
io.on("connection", function (socket) {
                                                        // si alguien se conecta recibo la conexión socket
  console.log("Alguien se ha conectado con socket");    // si alguien se conecta se imprime por consola
  socket.emit("messages", messages);                    // se le envía el objeto por defecto con
                                                        // el identificador messages

  socket.on("new-message", function (data) {            // si escucha en el socket un mensaje
    messages.color = data;                              // con el identificador recibo en data y reemplazo el objeto
    io.sockets.emit("messages", messages);              // emito el cambio a todos los clientes
  });
});

// escucha peticiones en el puerto
server.listen(app.get("port"), function () {
  console.log("El servidor corriendo en puerto", app.get("port"));
});
