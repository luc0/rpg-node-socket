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
		//this.loadTiles([[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua}],[{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Tierra},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua},{terrain:Agua}]] );
	}

	// Borra objeto del mapa
	this.removeObject = function( params ){
		this.createdObjects[ params.object.id ] = null;
	}

	// Carga los tiles desde un array en donde se le define el terrain de cada uno.
	this.loadTiles = function( params ){
		for( var tx = 0 ; tx < params.length ; tx++ ){
			for( var ty = 0 ; ty < params[tx].length ; ty++ ){
				this.tiles[tx][ty].terrain = new params[ty][tx].terrain({"position":{"x":tx,"y":ty}} );
			}
		}
	}

	// Devuelve tile en base a una posicion dada.
	this.getTile = function( position ){

		if( this.tiles[ position.x ] && this.tiles[ position.x ][ position.y ] ){
			return this.tiles[ position.x ][ position.y ];
		}else{
			return false;
		}

	}
/*
	// refresca posicion de un elemento ( being , terrain u object)
	this.refresh = function( params ){

		// Verifica en que capa esta el objeto
		var element_type;
		switch( params.type ){
			case "being":
				element_type = 'being';
				break;
			default:
				break;
		}

		// borra de la posicion anterior.
		this.getTile( params.lastPosition )[element_type] = null;
		// lo crea en la nueva posicion.
		this.getTile( params.element.position )[element_type] = element_type;

	}
*/
	//-------------------------------------------------------------------------------------
	// CLIENTE SOLAMENTE
	//-------------------------------------------------------------------------------------
	// Crea objetos en base a la data recibida recorriendo todos los tiles
	this.createObjects = function(){
		console.log("for createObjects");
		var o;
		for( var object in world.createdObjects){
			o = world.createdObjects[object]
			sprites.initSprite( {"object" : o} );
			this.getTile( o.position )[ o.type ] = o;
		}
		console.log(world.createdObjects);
		console.log(no.se)
	}



	//----------------------------------------------------------------------------------
	// Controles
	//----------------------------------------------------------------------------------
	this.controls = new Controls();
	this.controls.init();


}
