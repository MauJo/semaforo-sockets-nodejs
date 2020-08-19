var socket = io.connect('http://localhost:3000', { 'forceNew': true });

socket.on('messages', function(data){
    console.log(data);
    render(data);
});

//funcion para cambiar la clases del body
function render(data){
    var html = `<div>
                  <strong>${data.color}</strong>
                </div>`;
    
    document.getElementById('message').innerHTML = html;
    document.getElementById('body').style.backgroundColor = data.color;


}

/*function render(data){
    var html = data.map(function(elem, index){
        return(`<div>
                <strong>${elem.autor}</strong>:
                <em>${elem.text}</em>
                </div>`);
    }).join(" ");
      
    document.getElementById('messages').innerHTML = html;
}


function addMessage(e){
    var payload = {
        autor: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', payload);
    return false;

}*/

function funspecial(valor){
    document.getElementById('body').style.backgroundColor = valor;
    socket.emit('new-message', valor);
    return false;
};