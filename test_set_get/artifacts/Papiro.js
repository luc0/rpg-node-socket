function Papiro( params ){
	extend( this , Artifact , params );

	var defaults = {

		/*Nombre del papiro*/
		"name":"Papiro",
		"specie":"Papiro"
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	// Se agrega en el mapa
	this.world.getTile( this.position ).append({ 'artifact' : this });
}
