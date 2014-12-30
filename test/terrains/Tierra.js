function Tierra( params ){

	extend( this , Terrain , params );

	var defaults = {
		"name": 'tierra',
		"descripcion": "Tierra común y silvestre",
		"solid": false,
		"specie":"Tierra"
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	// Se agrega en el mapa
	this.world.getTile( this.position ).append({ 'terrain' : this })
}
