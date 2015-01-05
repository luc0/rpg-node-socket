//------------------------------------------------------------------------------------------------
// RECIBE DEL SERVER
//------------------------------------------------------------------------------------------------

websocket.on( 'world_update' , world_update );

function world_update( params ){
	console.log( 'aqui viene lo bueno joven' );
	console.log( params );
}