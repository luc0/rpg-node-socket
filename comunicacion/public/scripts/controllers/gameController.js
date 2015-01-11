//------------------------------------------------------------------------------------------------
// RECIBE DEL SERVER
//------------------------------------------------------------------------------------------------

websocket.on( 'world_update' , queue_world_update );
websocket.on( 'init_client' , init_client );
websocket.on( 'ping' , ping );
websocket.on( 'ask_drop' , ask_drop );


function ask_drop(){
	var answerDrop = Math.max( 1 , parseInt( prompt( 'Cuántos artefactos tiro?' ) ) );
	client.sendAnswer({ 'answer' : answerDrop} );

}
function ping( data ){
	var fechalocal = (new Date()).getMilliseconds();
	var fecharemota = data.fecha;
	console.log( fechalocal - fecharemota );
}

function queue_world_update( data ){
	for( var q in data.queue ){
		world_update( data.queue[q] );
	}
}
function world_update( data ){
	console.log("MIRA ESTOOO!!! " , data);
	var propertyReference;
	var treeArray;
	var value;
	if( data.being !== undefined ){
	// Actualización de las propiedades del BEING


		//Busca el objeto en el mundo que coincida con el id
		var being = world.createdObjects[ data.being ];
		var properties = data.data.all;

		//console.log( 'BEING',being,properties );
		//Recorre todas las propiedades que se van a actualizar
		for( var prop in properties ){


			treeArray = properties[prop].tree;
			value = properties[prop].value;

			/*
			 Comienza la referencia a la propiedad del objeto desde el mismo
			objeto
			*/
			propertyReference = being;

			/*Recorre todo el arbol sin incluir al ultimo elemento de la ruta*/

			for( var level = 0 ; level < treeArray.length-1 ; level++ ){
				// va agregando los distintos niveles en la ruta al objeto
				propertyReference = propertyReference[ treeArray[level] ];

			}
			propertyReference[ treeArray[level] ] = value;
		}

	}else if( data.artifact !== undefined ){
// Actualización de las propiedades del BEING


		//Busca el objeto en el mundo que coincida con el id
		var artifact = world.createdObjects[ data.artifact ];
		var properties = data.data.all;

		//console.log( 'BEING',artifact,properties );
		//Recorre todas las propiedades que se van a actualizar
		for( var prop in properties ){


			treeArray = properties[prop].tree;
			value = properties[prop].value;

			/*
			Comienza la referencia a la propiedad del objeto desde el mismo
			objeto
			*/
			propertyReference = artifact;

			/*Recorre todo el arbol sin incluir al ultimo elemento de la ruta*/

			for( var level = 0 ; level < treeArray.length-1 ; level++ ){
				// va agregando los distintos niveles en la ruta al objeto
				propertyReference = propertyReference[ treeArray[level] ];

			}
			propertyReference[ treeArray[level] ] = value;
		}
	}else if( data.tile !== undefined ){
		if(data.tile === "swap"){

		// Actualización de las propiedades del TILE
			var tileObject = world.createdObjects[data.data.object];
			var lastPosition = data.data.lastPosition;
			var position = tileObject.position;
			var lastTile = world.getTile( lastPosition );
			var tile = world.getTile( position );


			lastTile[ tileObject.type ] = null;
			tile[ tileObject.type ] = tileObject;
			return;
		}
		if(data.tile === "remove"){

		// Actualización de las propiedades del TILE
			var tileObject = world.createdObjects[data.data.object];
			var lastPosition = data.data.lastPosition;
			var lastTile = world.getTile( lastPosition );

			lastTile[ tileObject.type ] = null;
			return;
		}

	}else if( data.world !== undefined ){
	// Actualización de las propiedades del WORLD
		delete world.createdObjects[ tileObject.id ];

	}else if( data.newBeing !== undefined ){

		var newBeing = data.newBeing;
		console.log("Creando nuevo " + newBeing.type + " con el id " + newBeing.id);
		world.createdObjects[newBeing.id] = newBeing;
	}else if( data.newArtifact !== undefined ){

		var newArtifact = data.newArtifact;
		console.log("Creando nuevo " + newArtifact.type + " con el id " + newArtifact.id);
		world.createdObjects[newArtifact.id] = newArtifact;
	}

}

function init_client( data ){

	world.create();
	copyProperties( data.world , world );
	world.createObjects();
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





//------------------------------------------------------------------------------------------------
// ENVIA AL SERVER
//------------------------------------------------------------------------------------------------
