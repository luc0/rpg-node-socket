function Map( params ){

	var defaults = {

		"tiles" : null

	}

	merge( defaults , params , this );

	// Carga los tiles desde un array en donde se le define el terrain de cada uno.
	this.loadTiles = function( params ){

		for( var tx in params ){
			for( var ty in params[tx] ){
				this.tiles[tx][ty].terrain = params[tx][ty].terrain;
			}
		}

	}

	// Devuelve tile en base a una posicion dada.
	this.getTile = function( position ){

		return this.tiles[ position.x ][ position.y ];

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
		this.getTile( params.lastPosition )[element_type] = null;
		// lo crea en la nueva posicion.
		this.getTile( params.element.position )[element_type] = params.element;
	}

}
