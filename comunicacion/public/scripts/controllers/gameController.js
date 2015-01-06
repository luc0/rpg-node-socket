//------------------------------------------------------------------------------------------------
// RECIBE DEL SERVER
//------------------------------------------------------------------------------------------------

websocket.on( 'world_update' , world_update );
websocket.on( 'init_client' , init_client );

function world_update( params ){
	console.log( 'aqui viene lo bueno joven' );
	console.log( params );
}

function init_client( params ){
	 console.log( params.world );
	 remote_world = params.world;
	 world.create();
	 draw();
}
