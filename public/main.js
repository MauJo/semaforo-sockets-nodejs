// iniciando una conexión mediante socket al servidor https://prosemsoc.herokuapp.com/
//var socket = io.connect("https://prosemsoc.herokuapp.com/", { forceNew: true });
var socket = io.connect("http://localhost:3000/", { forceNew: true });

// escuchando el socket, si recibe un mensaje con identificador saludo recibo el json
socket.on("saludo", function (data) {
  console.clear();
  console.log(
    "Me conecte por socket con id: " + socket.id + " respondio con el json:"
  );
  console.log(data); // imprime el json por consola
  render([data]); // renderiza por pantalla el json recibido
  console.log("Se responde con el mismo json y solicitando Broadcast");
  socket.emit("broadcast", data);
  // para este msj se utiliza el identificador broadcast para indicarle al servidor que haga difusión del mismo
});
socket.on("message", function (data) {   // se reciben del servidor los msjs con identificador message
  socket.emit("res-message", data); // se utiliza para responderle al servidor
});
socket.on("broadcast", function (data) {
  // se reciben los msjs Broadcast enviados desde otros clientes
  console.log("Se recibio Broadcast:");
  console.log(data); // se muestra el json o arreglo de json recibidos del servidor
  render(data); // se renderiza el arreglo por pantalla
});

// funcion para construir el html
function render(data) {
  var html = data
    .map(function (elem, index) {
      // recorre un arreglo con elementos json
      return `<div> 
              <strong>id: </strong>${elem.id}
              <strong> Dato: </strong>${elem.dato}
              <strong> Player: </strong>${elem.player}
              </div>`;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
}
