function Aguila( params ){
	extend( this , Being , params );

	var defaults = {

		/*Nombre del elfo*/
		"name":"Aguila",
		"specie":"Aguila",
		"stats" : {
			"life" : { "min" : 15 , "max" : 15 },

			"damage": { "min" : 2 , "max" : 3 },

			"shields": { "min" : 0 , "max" : 0 },

			"accurancy" : 100e3,

			"agility" : 10e3,

			"points": {"min":10}
		}
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	// Se agrega en el mapa
	this.world.getTile( this.position ).append({ 'being' : this });
	this.createControls();
}
