// declaracion de variables
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

// set de variable
app.set("port", process.env.PORT || 3000); // process.env.PORT usar el puerto designado por heroku

// objeto por defecto

/*
var men_ini = {
  color: "white",
};
*/
var vector = {};
var contador = 0;

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.status(200).send("Hello Mundo!");
});

// establecimiento de la conexion
io.on("connection", function (socket) {
  contador = contador + 1;
                                                        // si alguien se conecta recibo la conexión socket
  console.log("Alguien se ha conectado con socket" , contador);    // si alguien se conecta se imprime por consola
  socket.emit("messages", obj_ini(contador));                    // se le envía el objeto por defecto con
                                                        // el identificador messages

  socket.on("res-message", function (data) {            // si escucha en el socket un mensaje
    vector.push = data;                              // con el identificador recibo en data y reemplazo el objeto
    io.sockets.emit("messages", data);              // emito el cambio a todos los clientes
  });
});

// escucha peticiones en el puerto
server.listen(app.get("port"), function () {
  console.log("El servidor corriendo en puerto", app.get("port"));
});

function obj_ini(num){
  var men_ini = {
    id: num,
    msj: "Bienvenido estimado usuario"
  };
  return men_ini
}
