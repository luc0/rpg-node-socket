var Elfo = function( params , world ){

	// Props del hijo (con mas valor que las del Padre)
	var defaults = {

		/*Nombre del elfo*/
		"name":"Elfo",
		"specie":"Elfo",
		"stats" : {
			"life" : { "min" : 40 , "max" : 40 },

			"damage": { "min" : 5 , "max" : 10 },

			"shields": { "min" : 0 , "max" : 0 },

			"accurancy" : 100e3,

			"agility" : 10e3,

			"points": {"min":275 }
		},
	}

	// Hereda del padre y le agrega defaults.
	extend( this , Being , defaults );

	// Sobreescribe las propiedades con los valores pasados en params cuando se instancia.
	merge( this , params , this );

	// Se agrega en el mapa
	this.world = world;
	this.world.getTile( this.position ).append({ 'being' : this });
}