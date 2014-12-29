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

}