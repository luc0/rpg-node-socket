function Escudo( params ){
	extend( this , Artifact , params );

	var defaults = {

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

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	// Se agrega en el mapa
	this.world.getTile( this.position ).append({ 'artifact' : this });

}
