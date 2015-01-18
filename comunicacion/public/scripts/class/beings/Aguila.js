var Aguila = function( params ){

	// Props del hijo (con mas valor que las del Padre)
	var defaults = {
		"sprite":{
			"images":"../public/sprites/aguila-down.png",
			"hasToCalculatePosition":true
		},
		/*Nombre del elfo*/
		"name":"Aguila",
		"specie":"Aguila",
		"stats" : {
			"life" : { "min" : 15 , "max" : 15 },

			"damage": { "min" : 2 , "max" : 3 },

			"shields": { "min" : 0 , "max" : 0 },

			"accurancy" : 100e3,

			"agility" : 10e3,

			"points": {"min":150 }
		}
	}

	// Hereda del padre y le agrega defaults.
	extend( this , Being , defaults );

	// Sobreescribe las propiedades con los valores pasados en params cuando se instancia.
	merge( this , params , this );

	// Se agrega en el mapa
	world.getTile( this.position ).append({ 'being' : this });

}
