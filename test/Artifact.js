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

		"map":null,

		"type":Artifact
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	this.setMap = function( params ){
		this.map = params;
	}

	this.setMap( params.map );

	// Se agrega en el mapa
	this.map.getTile( this.position ).append({ 'artifact' : this })
}
