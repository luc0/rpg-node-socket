// Modelo Artifact
function Artifact( params ){
	var defaults = {

		/*Objeto que contiene el sprite de THREE.JS*/
		"sprite":null,

		/*Posicion del Being*/
		"position":{
			"x":0,
			"y":0
		},

		/*Angulo del Being*/
		"rotation":{
			"x":0,
			"y":0
		},

		/*Propiedad que define si el objeto puede Being atravesado*/
		"solid":false,

		// no lo estamos usando, lo dejamos por si las moscas
		"world":null,

		"type":Artifact
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	this.setWorld = function( params ){
		this.world = params;
	}

	this.setWorld( params.world );

}
