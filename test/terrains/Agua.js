function Agua( params ){

	extend( this , Terrain , params );

	var defaults = {
		"name": 'agua',
		"descripcion": "Agua profunda",
		"solid": true
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	// Se agrega en el mapa
	console.log(this)
	this.map.getTile( this.position ).append({ 'terrain' : this })

}
