// iniciando una conexión mediante socket al servidor https://prosemsoc.herokuapp.com/
/*if (false) {
	var socket = io.connect("https://prosemsoc.herokuapp.com/", { forceNew: true });
}else{
*/	var socket = io.connect("192.168.0.4:3000/", { forceNew: true });
//}

export socket;