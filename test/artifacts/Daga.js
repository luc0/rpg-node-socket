function Daga( params ){
	extend( this , Artifact , params );

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

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	// Se agrega en el mapa
	this.world.getTile( this.position ).append({ 'artifact' : this });

}
