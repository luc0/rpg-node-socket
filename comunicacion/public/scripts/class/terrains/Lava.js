var Lava = function( params , world ){

	// Props del hijo (con mas valor que las del Padre)
	var defaults = {
		"name": 'Lava',
		"descripcion": "Quema quema!",
		"solid": true,
		"specie":"Agua"
	}

	// Hereda del padre y le agrega defaults.
	extend( this , Terrain , defaults );

	// Sobreescribe las propiedades con los valores pasados en params cuando se instancia.
	merge( this , params , this );

	// Se agrega en el mundo
	this.world = world;
	this.world.getTile( this.position ).append({ 'terrain' : this })
}
