// iniciando una conexión mediante socket al servidor https://prosemsoc.herokuapp.com/
//var socket = io.connect("https://prosemsoc.herokuapp.com/", { forceNew: true });
var socket = io.connect("http://localhost:3000/", { forceNew: true });

// escuchando el socket, si recibe un mensaje con identificador messages recibo la data
socket.on("messages", function (data) {
  console.log("Me conecté con socket: "+socket.id);
  console.log(data);                                // imprime la data por consola
  render(data);                                     // ejecuta la funcion render que modifica el front-end
});
// funcion para construir el html y el cambio de backgroundcolor en el body
function render(data) {
	
  var html =    `<div><strong>${data.color}</strong></div>`;
  var message = "message"+data.player;
  var player = "player"+data.player;

  //alert(player);
  document.getElementById(message).innerHTML = html;
  document.getElementById(player).style.backgroundColor = data.color; // establece el color del body
}
// funcion que se ejecuta al pulsar los botones
function funboton(valor, player) {
	data = {
		player: player,
		color: valor,
	} 
  document.getElementById("player"+player).style.backgroundColor = valor;    // establece el color del body
  socket.emit("new-message", data);                                // emite al servidor el nuevo valor
  return false;
}

function funboton1(valor){
	funboton(valor, "1");
}

function funboton2(valor){
	funboton(valor, "2");
}