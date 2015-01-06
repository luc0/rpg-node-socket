var Pollo = function( params , world ){

	// Props del hijo (con mas valor que las del Padre)
	var defaults = {

		/*Nombre del papiro*/
		"name":"Pollo",
		"specie":"Pollo",
		"usable":true,
		"consumable":true,
		"modificators":{
			"hunger":{"min":11}
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