function Terrain( params ){


	var defaults = {

		/*Objeto que contiene el sprite de THREE.JS*/
		"sprite":null,

		/*Posicion del Terrain*/
		"position":{
			"x":0,
			"y":0
		},

		/*Angulo del Terrain*/
		"rotation":{
			"x":0,
			"y":0
		},

		/*Propiedad que define si el objeto puede Terrain atravesado*/
		"solid":true,

		// no lo estamos usando, lo dejamos por si las moscas
		"world":null,

		"type":Terrain
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );
	this.setWorld = function( params ){
		this.world = params;
	}
	console.log(params)
	this.setWorld( params.world );

}
