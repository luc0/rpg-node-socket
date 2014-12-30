function Elfo( params ){
	extend( this , Being , params );

	var defaults = {

		/*Nombre del elfo*/
		"name":"Elfo",
		"specie":"Elfo"
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	// Se agrega en el mapa
	this.map.getTile( this.position ).append({ 'being' : this });
	this.createControls();
}
