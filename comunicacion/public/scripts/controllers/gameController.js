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




	//console.log( world );
	world.create();
	copyProperties( params.world , world );
	draw();
}

function copyProperties( origin , destiny ){
	for( prop in origin ){
		if( origin[prop] instanceof Object ){
			if(origin[prop] instanceof Array) destiny[prop]=[];
			if(destiny[prop] === undefined) destiny[prop]= {}

			copyProperties( origin[prop] , destiny[prop] )
			continue;
		}
		destiny[prop] = origin[prop];
	}
}
