function Elfo( params ){
	extend( this , Being , params );
	var defaults = {

		/*Nombre del elfo*/
		"name":"Elfo",
		"specie":"Elfo",
		"stats" : {

			"life" : { "min" : 40 , "max" : 40 },

			"damage": { "min" : 5 , "max" : 10 },

			"shields": { "min" : 0 , "max" : 0 },

			"accurancy" : 100e3,

			"agility" : 10e3,

			"points": {"min":275 }
		}
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , this , this );

	// Se agrega en el mapa
	this.world.getTile( this.position ).append({ 'being' : this });
	this.createControls();
}
