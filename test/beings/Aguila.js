function Aguila( params ){
	extend( this , Being , params );

	var defaults = {

		/*Nombre del elfo*/
		"name":"Aguila",
		"specie":"Aguila",
		"stats" : {
			"life" : {"min":80,"max":80},
			"points": 10
		}
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	// Se agrega en el mapa
	this.world.getTile( this.position ).append({ 'being' : this });
	this.createControls();
}
