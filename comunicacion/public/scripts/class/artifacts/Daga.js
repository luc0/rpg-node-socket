var Daga = function( params , world ){

	// Props del hijo (con mas valor que las del Padre)
	var defaults = {

		/*Nombre de la daga*/
		"name":"Daga",

		"solid":false,

		"specie":"Daga",

		// lugar donde se equipa
		"equipable":[
			"rightHand",
			"leftHand"
		],

		"modificators" : {
			"damage" : { "min" : 2 , "max" : 4 }
		}


	}

	// Hereda del padre y le agrega defaults.
	extend( this , Artifact , defaults );

	// Sobreescribe las propiedades con los valores pasados en params cuando se instancia.
	merge( this , params , this );

	// Se agrega en el mapa
	this.world = world;
	this.world.getTile( this.position ).append({ 'artifact' : this });

}
