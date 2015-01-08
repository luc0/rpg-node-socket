
// Modelo Artifact
var Artifact = function( params ){
	var defaults = {

		/*Objeto que contiene el sprite de THREE.JS*/
		"sprite":null,

		"id":null,

		/*Angulo del Being*/
		"rotation":{
			"x":0,
			"y":0
		},


		"type":"artifact",

		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		/*
			PROPIEDADES DE COMUNICACION: Las propiedades con el prefijo _
			utilizan setters y getters para clonar el valor asignado a cada
			propiedad en una lista de valores modificados.
			Luego sera enviad apor socket.
		*/
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

		/*Posicion del Being*/
		"position":{
			"x":0,
			"y":0
		},

		/*Propiedad que define si el objeto puede Being atravesado*/
		"solid":false,

		// Indica si se puede usar el objeto
		"usable":false,

		// Indica si una vez usado el objeto desaparece
		"consumable":false,

		// Cantidad de items
		"count" : 1,

	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );




}
