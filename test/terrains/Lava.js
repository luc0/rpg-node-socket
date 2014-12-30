function Lava( params ){

	extend( this , Terrain , params );

	var defaults = {
		"name": 'lava',
		"descripcion": "Quema quema!",
		"solid": true
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	// Se agrega en el mundo
	this.world.getTile( this.position ).append({ 'terrain' : this })
}
