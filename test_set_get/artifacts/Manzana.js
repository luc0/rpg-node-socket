function Manzana( params ){
	extend( this , Artifact , params );

	var defaults = {

		/*Nombre del papiro*/
		"name":"Manzana",
		"specie":"Manzana",
		"usable":true,
		"consumable":true,
		"modificators":{
			"hunger":{"min":7}
		}
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	// Se agrega en el mapa
	this.world.getTile( this.position ).append({ 'artifact' : this });
}
