function Casco( params ){
	extend( this , Artifact , params );

	var defaults = {

		/*Nombre de la daga*/
		"name":"Casco",

		"solid":false,

		"specie":"Casco",

		// lugar donde se equipa
		"equipable":[
			"head",
		],

		"modificators" : {
			"shields" : { "min" : 1 , "max" : 2 }
		}

	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	// Se agrega en el mapa
	this.world.getTile( this.position ).append({ 'artifact' : this });

}
