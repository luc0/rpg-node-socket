
var user;
var client = new Client();

//------------------------------------------------------------------------------------------------
// RECIBE DEL SERVER
//------------------------------------------------------------------------------------------------

websocket.on( 'user_login' , user_login );
websocket.on( 'old_server' , old_server );
websocket.on( 'get_client_date' , get_client_date );

function user_login( params ){

	if( params.success ){
		console.log( 'SERVER: logueado!' )
	}

}

// El server pide date
function get_client_date(){
	var data = { "startDate" : client.startDate };
	websocket.emit( 'check_date' , data );
}

// Si el clienet inicio antes del Server, refrescar.
function old_server(){
	location.reload();
}


//------------------------------------------------------------------------------------------------
// ENVIA AL SERVER
//------------------------------------------------------------------------------------------------


// login
(function(){
	var tmp_name = 'u'+parseInt(Math.random()*10000)//prompt('Nombre');
	console.log('USUARIO:',tmp_name)
	user = new User({ "username" : tmp_name });
	var data = { "user" : user };
	websocket.emit( 'user_login' , data );
})();

// logout
(function(){
	window.onbeforeunload = function(){
		var data = { "user" : user };
		websocket.emit( 'user_logout' , data );
	}
})();