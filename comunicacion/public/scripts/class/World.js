var World = function( params ){

	var defaults = {

		"tiles" : null,

		"createdObjects": {},

		"stats":{
			"levelGrowth": { // Ganancia al pasar de nivel
				"experience" : 1.4, // Multiplicador de la exp necesaria x nivel.
				"life": 10,
				"damage": 1
			}
		}

	}

	merge( defaults , params , this );


	this.create = function(){
		this.tiles = createArray( 30 , 30 , Tile );
		this.loadTiles([[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua}]] );
	}
	
	// Borra objeto del mapa
	this.removeObject = function( params ){
		remoteWorld.createdObjects[ params.object.name ] = null;
	}

	// Carga los tiles desde un array en donde se le define el terrain de cada uno.
	this.loadTiles = function( params ){
		for( var tx = 0 ; tx < params.length ; tx++ ){
			for( var ty = 0 ; ty < params[tx].length ; ty++ ){
				remoteWorld.tiles[tx][ty].terrain = new params[ty][tx].terrain({"position":{"x":tx,"y":ty}} );
			}
		}
	}

	// Devuelve tile en base a una posicion dada.
	this.getTile = function( position ){
		if( remoteWorld.tiles[ position.x ] && remoteWorld.tiles[ position.x ][ position.y ] ){
			return remoteWorld.tiles[ position.x ][ position.y ];
		}else{
			return false;
		}

	}

	// refresca posicion de un elemento ( being , terrain u object)
	this.refresh = function( params ){

		// Verifica en que capa esta el objeto
		var element_type;
		switch( params.element.type ){
			case Being:
				element_type = 'being';
				break;
			default:
				break;
		}

		// borra de la posicion anterior.
		remoteWorld.getTile( params.lastPosition )[element_type] = null;
		// lo crea en la nueva posicion.
		remoteWorld.getTile( params.element.position )[element_type] = params.element;
	}


}



var remoteWorld = function( params ){

	var defaults = {

		"tiles" : null,

		"createdObjects": {},

		"stats":{
			"levelGrowth": { // Ganancia al pasar de nivel
				"experience" : 1.4, // Multiplicador de la exp necesaria x nivel.
				"life": 10,
				"damage": 1
			}
		}

	}

	merge( defaults , params , this );

}
