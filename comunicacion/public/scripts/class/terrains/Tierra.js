var Tierra = function( params ){

	// Props del hijo (con mas valor que las del Padre)
	var defaults = {
		"sprite":{
			"images":"../public/sprites/pasto.jpg",
			"hasToCalculatePosition":false
		},
		"name": 'tierra',
		"descripcion": "Tierra común y silvestre",
		"solid": false,
		"specie":"Tierra",
	}

	// Hereda del padre y le agrega defaults.
	extend( this , Terrain , defaults );

	// Sobreescribe las propiedades con los valores pasados en params cuando se instancia.
	merge( this , params , this );


	// Se agrega en el mapa
	console.log("get tile")

	world.getTile( this.position ).append({ 'terrain' : this })
}
