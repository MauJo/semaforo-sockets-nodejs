// iniciando una conexión mediante socket al servidor https://prosemsoc.herokuapp.com/
//var socket = io.connect("https://prosemsoc.herokuapp.com/", { forceNew: true });
var socket = io.connect("http://localhost:3000/", { forceNew: true });
// escuchando el socket, si recibe un mensaje con identificador messages recibo la data
socket.on("messages", function (data) {
  console.log(data);                                // imprime la data por consola
  render(data);                                     // ejecuta la funcion render que modifica el front-end
});
// funcion para construir el html y el cambio de backgroundcolor en el body
function render(data) {
  var html =    `<div><strong>${data.color}</strong></div>`;
  document.getElementById("message").innerHTML = html;
  document.getElementById("body").style.backgroundColor = data.color; // establece el color del body
}
// funcion que se ejecuta al pulsar los botones
function funboton(valor) {
  document.getElementById("body").style.backgroundColor = valor;    // establece el color del body
  socket.emit("new-message", valor);                                // emite al servidor el nuevo valor
  return false;
}
