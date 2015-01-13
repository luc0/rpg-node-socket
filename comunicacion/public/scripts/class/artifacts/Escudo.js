var Escudo = function( params ){

	// Props del hijo (con mas valor que las del Padre)
	var defaults = {
		"sprite":{
			"images":"public/sprites/escudo.png",
			"hasToCalculatePosition":true
		},
		/*Nombre de la daga*/
		"name":"Escudo",

		"solid":false,

		"specie":"Escudo",

		// lugar donde se equipa
		"equipable":[
			"leftHand"
		],

		"modificators" : {
			"shields" : { "min" : 1 , "max" : 3 }
		}

	}

	// Hereda del padre y le agrega defaults.
	extend( this , Artifact , defaults );

	// Sobreescribe las propiedades con los valores pasados en params cuando se instancia.
	merge( this , params , this );

	// Se agrega en el mapa
	world.getTile( this.position ).append({ 'artifact' : this });

}
