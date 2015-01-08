var Papiro = function( params ){

	// Props del hijo (con mas valor que las del Padre)
	var defaults = {

		/*Nombre del papiro*/
		"name":"Papiro",
		"specie":"Papiro"
	}

	// Hereda del padre y le agrega defaults.
	extend( this , Artifact , defaults );

	// Sobreescribe las propiedades con los valores pasados en params cuando se instancia.
	merge( this , params , this );

	// Se agrega en el mapa
	world.getTile( this.position ).append({ 'artifact' : this });
}
