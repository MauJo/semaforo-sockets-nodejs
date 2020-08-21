//import socket from 'import';

// iniciando una conexión mediante socket al servidor https://prosemsoc.herokuapp.com/
//var socket = io.connect("https://prosemsoc.herokuapp.com/", { forceNew: true });
var socket = io.connect("http://localhost:3000/", { forceNew: true });

console.log(socket); //cesar 
var playerNumber = "";

// escuchando el socket, si recibe un mensaje con identificador saludo recibo el json
socket.on("saludo", function (data) {
  console.clear();
  console.log(
    "Me conecte por socket con id: " + socket.id + " respondio con el json:"
  );
  console.log(data); // imprime el json por consola

  playerNumber = data.player; //inicializa el player como 1 o 2
  renderArray([data]); // renderiza por pantalla el json recibido
  render(data);
  console.log("Se responde con el mismo json y solicitando Broadcast");
  socket.emit("broadcast", data);
  // para este msj se utiliza el identificador broadcast para indicarle al servidor que haga difusión del mismo
});
socket.on("message", function (data) {   // se reciben del servidor los msjs con identificador message
  console.log(data);                                // imprime la data por consola
  render(data); 
  
  socket.emit("res-message", data); // se utiliza para responderle al servidor
});
socket.on("broadcast", function (data) {
  // se reciben los msjs Broadcast enviados desde otros clientes
  console.log("Se recibio Broadcast:");
  console.log(data); // se muestra el json o arreglo de json recibidos del servidor
  renderArray(data); // se renderiza el arreglo por pantalla
});

// funcion para construir el html
function render(data){  
  var htmlcolor = `<div><strong>${data.color}</strong></div>`;
  var message = "message" + data.player;
  var player = "player" + data.player;
  document.getElementById(message).innerHTML = htmlcolor;
  document.getElementById(player).style.backgroundColor = data.color;
}

function renderArray(data) {
  var html = data.map(function (elem, index) {
      // recorre un arreglo con elementos json
      return `<div> 
              <strong>id: </strong>${elem.id}
              <strong> Dato: </strong>${elem.dato}
              <strong> Player: </strong>${elem.player}
              </div>`;
    }).join(" ");
  document.getElementById("messages").innerHTML = html;
}  

// funcion que se ejecuta al pulsar los botones
function funboton(valor) {
	data = {
    id: socket.id,
    dato: "conexion establecida",
		player: 1,
		color: valor,
	}
  document.getElementById("player"+playerNumber).style.backgroundColor = valor;    // establece el color del body
  socket.emit("res-message", data);                                // emite al servidor el nuevo valor
  return false;
}