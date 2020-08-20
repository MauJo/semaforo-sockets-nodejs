//import socket from 'import';

// iniciando una conexión mediante socket al servidor https://prosemsoc.herokuapp.com/
// var socket = io.connect("https://prosemsoc.herokuapp.com/", { forceNew: true });
var socket = io.connect("192.168.0.4:3000/", { forceNew: true });
console.log(socket);

var playerNumber = "";

//Escuchando el socket, si recibe un mensaje con identificador numeroplayer recibo la data
socket.on("numeroplayer", function (data) {
  playerNumber = data.player; //inicializa el player como 1 o 2
  console.log(data);                      
  render(data);     
});
//Escuchando el socket, si recibe un mensaje con identificador messages recibo la data
socket.on("messages", function (data) {
  console.log(data); // imprime la data por consola
  render(data);      // ejecuta la funcion render que modifica el front-end
});

////////////////Funciones////////////////
// funcion para construir el html y el cambio de backgroundcolor en el body
function render(data) {
	
  var html =    `<div><strong>${data.color}</strong></div>`;
  var message = "message"+data.player;
  var player = "player"+data.player;

  document.getElementById(message).innerHTML = html;
  document.getElementById(player).style.backgroundColor = data.color; // establece el color del body
}
// funcion que se ejecuta al pulsar los botones
function funboton(valor) {
	data = {
		player: 1,
		color: valor,
	}
  document.getElementById("player"+playerNumber).style.backgroundColor = valor;    // establece el color del body
  socket.emit("new-message", data);  // emite al servidor el nuevo mensaje
  return false;
}
