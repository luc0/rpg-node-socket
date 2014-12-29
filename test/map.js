function Map(){

	var defaults = {

		"tiles" : null

	}

	this.loadTiles = function( params ){

		for( var tx in params ){
			for( var ty in params[tx] ){
				this.tiles[tx][ty].terrain = params[tx][ty].terrain;
			}
		}

	}

}