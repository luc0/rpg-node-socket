function Enano( params ){
	extend( this , Being , params );

	var defaults = {

		/*Nombre del elfo*/
		"name":"Enano",
		"specie":"Enano"
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	// Se agrega en el mapa
	this.world.getTile( this.position ).append({ 'being' : this });
	this.createControls();
}
