function PocionRoja( params ){
	extend( this , Artifact , params );

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

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	// Se agrega en el mapa
	this.world.getTile( this.position ).append({ 'artifact' : this });

}
