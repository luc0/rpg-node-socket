var PocionRoja = function( params ){

	// Props del hijo (con mas valor que las del Padre)
	var defaults = {
		
		/*Nombre de la daga*/
		"name":"PocionRoja",
		"specie":"PocionRoja",
		"usable":true,
		"consumable":true,
		"modificators":{
			"life":{ "min" : 10 }
		}

	}

	// Hereda del padre y le agrega defaults.
	extend( this , Artifact , defaults );

	// Sobreescribe las propiedades con los valores pasados en params cuando se instancia.
	merge( this , params , this );

	// Se agrega en el mapa
	world.getTile( this.position ).append({ 'artifact' : this });

}
