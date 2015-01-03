window.onload = function(){

	var clientSocket = io.connect();

	clientSocket.on('connect', function () {

		console.log('Conectado');

		clientSocket.on('message', recibeMensaje);
		clientSocket.on('disconnect', desconecta);
	});

	function recibeMensaje( data ){
		console.log(data.message);
	}
	
	function desconecta(){}
}
