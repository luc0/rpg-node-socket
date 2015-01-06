var Enano = function( params , world ){

	// Props del hijo (con mas valor que las del Padre)
	var defaults = {

		"name":"Enano",
		"specie":"Enano"
	}

	// Hereda del padre y le agrega defaults.
	extend( this , Being , defaults );

	// Sobreescribe las propiedades con los valores pasados en params cuando se instancia.
	merge( this , params , this );

	// Se agrega en el mapa
	this.world = world;
	this.world.getTile( this.position ).append({ 'being' : this });
}
