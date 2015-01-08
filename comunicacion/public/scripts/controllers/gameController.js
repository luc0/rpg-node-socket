//------------------------------------------------------------------------------------------------
// RECIBE DEL SERVER
//------------------------------------------------------------------------------------------------

websocket.on( 'world_update' , world_update );
websocket.on( 'init_client' , init_client );

function world_update( data ){
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
	// Actualización de las propiedades del ARTIFACT

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
	// Actualización de las propiedades del TILE
		var tileObject = data.data.object;

		if(data.data.lastPosition !== undefined){
			var tileOld = world.getTile( data.data.lastPosition );
			tileOld[ tileObject.type ] = null ;
		}

		var tileNew = world.getTile( data.data.object.position );
		tileNew[ tileObject.type ] = tileObject;

	}else if( data.world !== undefined ){
	// Actualización de las propiedades del WORLD
		delete world.createdObjects[ data.object.id ];

	}

}

function init_client( data ){

	//console.log( world );
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
