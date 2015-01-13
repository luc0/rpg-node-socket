console.log('Clase Client -> OK');

//------------------------------------------------------------------
// Client
//------------------------------------------------------------------

var Client = function(){

	// Guarda fecha de inicio del cliente.
	this.startDate = (new Date()).getTime();

	this.userId = null;
	this.ping = 0;

	// Cada vez que apreta una tecla.
	this.sendControls = function( params ){
		var data = { "userId" : this.userId , "key" : params.control };
		websocket.emit( 'user_keydown' , data );
	}

	// Le dice al server cuantos items tira.
	this.sendAnswer = function( params ){
		var data = { "answer" : params.answer };
		websocket.emit( 'answer_drop' , data );
		console.log('Respondiendo... Tira ' + data.answer);
	}

	setInterval(function(){
		client.ping = (new Date()).getTime();
		websocket.emit( 'ping' );
	},1000)


}
