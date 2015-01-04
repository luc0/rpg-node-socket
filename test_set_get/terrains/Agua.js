function Agua( params ){

	extend( this , Terrain , params );

	var defaults = {
		"name": 'agua',
		"descripcion": "Agua profunda",
		"solid": true,
		"specie":"Agua"
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	// Se agrega en el mundo
	this.world.getTile( this.position ).append({ 'terrain' : this })

}
