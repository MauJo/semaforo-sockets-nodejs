//import {urlServer} from './import';
//import * from 'import.js';
//import 'import.js';

//const urlServer = "https://prosemsoc.herokuapp.com/";
const urlServer = "192.168.0.4:3000/";

//alert(urlServer);

var socket = io.connect(urlServer, { forceNew: true });


///////////////////////////////////////////////////////////////////////////////
// CONSTANTES

///////////////////////////////////////////////////////////////////////////////
// VARIABLES GLOVALES
var playerNumber = "";
//var socket = socket2;
///////////////////////////////////////////////////////////////////////////////
// ARRAYS GLOVALES

///////////////////////////////////////////////////////////////////////////////
// OBJETOS GLOVALES

///////////////////////////////////////////////////////////////////////////////
// SOCKETS

//---------------------------------------------------------------------------//
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
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
  socket.emit("broadcast", data);
  // para este msj se utiliza el identificador broadcast para indicarle al servidor que haga difusión del mismo


});
//---------------------------------------------------------------------------//
socket.on("message", function (data) {   // se reciben del servidor los msjs con identificador message
  console.log(data);                                // imprime la data por consola
  render(data); 
  
  //socket.emit("res-message", data); // se utiliza para responderle al servidor
});
//---------------------------------------------------------------------------//
socket.on("broadcast", function (data) {
  // se reciben los msjs Broadcast enviados desde otros clientes
  console.log("Se recibio Broadcast:");
  console.log(data); // se muestra el json o arreglo de json recibidos del servidor
  renderArray(data); // se renderiza el arreglo por pantalla
});
///////////////////////////////////////////////////////////////////////////////
// FUNCIONES
//---------------------------------------------------------------------------//
// funcion para construir el html
function render(data){  
  var htmlcolor = `<div><strong>${data.color}</strong></div>`;
  var message = "message" + data.player;
  var player = "player" + data.player;
  document.getElementById(message).innerHTML = htmlcolor;
  document.getElementById(player).style.backgroundColor = data.color;
}
//---------------------------------------------------------------------------//
function renderArray(data) {
  var html = data.map(function (elem, index) {// recorre un arreglo con elementos json
            var aux = null;
      (socket.id == elem.id) ? aux = 'style="background-color: #00FFFF;"' : aux = null; // identificacion visual de tu usuario
      return `<div ${aux}> 
              <strong>id: </strong>${elem.id}
              <strong> Dato: </strong>${elem.dato}
              <strong> Player: </strong>${elem.player}
              </div>`;
    }).join(" ");
  document.getElementById("messages").innerHTML = html;
}  
//---------------------------------------------------------------------------//
// funcion que se ejecuta al pulsar los botones
function funboton(valor) {
	data = {
		player: playerNumber,
		color: valor,
	}
  render(data);
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
  socket.emit("res-message", data);                                // emite al servidor el nuevo valor
  return false;
}