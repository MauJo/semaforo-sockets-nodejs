// iniciando una conexión mediante socket al servidor https://prosemsoc.herokuapp.com/
//var socket = io.connect("https://prosemsoc.herokuapp.com/", { forceNew: true });
var socket = io.connect("http://localhost:3000/", { forceNew: true });
// escuchando el socket, si recibe un mensaje con identificador messages recibo la data
var iden = 'null';
socket.on("messages", function (data) {
  console.log(data);                                // imprime la data por consola
    if (iden == "null"){
        iden = data.id;
        console.log('Player ', iden);
        render(data);
    } else {
      //document.getElementById(data.id.value).style.backgroundColor = data.color;
      document.getElementById("body").style.backgroundColor = data.data1;
    }                                    
});
// funcion para construir el html y el cambio de backgroundcolor en el body
function render(data) {
  var html = `<div><strong>Eres el Player ${data.id}</strong></div>`;
  document.getElementById("message").innerHTML = html;
  }
// funcion que se ejecuta al pulsar los botones
function funboton(valor) {
  var payload = {
    id: iden,
    data1: valor,
    data2: 'null',
    data3: 'null',
    data4: 'null',
    data5: 'null'
  };
  document.getElementById("body").style.backgroundColor = valor;    // establece el color del body
  socket.emit("res-message", payload);                                // emite al servidor el nuevo valor
  return false;
}
