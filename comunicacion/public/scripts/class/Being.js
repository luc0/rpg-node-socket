var Being = function( params ){

	var defaults = {

		"type":"being",


		/*Objeto que contiene el sprite de THREE.JS*/
		"sprite":null,


		/*Angulo del Being*/
		"rotation":{
			"x":0,
			"y":0
		},

		/*Propiedad que define quien controla al Being*/
		"controls":null,

		/*Propiedad que define si el objeto puede Being atravesado*/
		"solid":true,

		"provisorio":{ // Vars PROVISORIAS que se borraran con three
			"timerCamina": null
		},

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

		/*Direccion del Being*/
		"direction": 'up',

		/*Inventario del Being*/
		"inventory": [],

		/*Atributos de juego del Being*/
		"stats" : {

			"luck": 50e3,

			"level": { "min" : 1 , "max" : 50 },

			"experience": { "min" : 0 , "max" : 200 },

			"life": { "min" : 20 , "max" : 20 },

			"damage": { "min" : 2 , "max" : 4 },

			"critical" : 5e3,

			"shields": { "min" : 0 , "max" : 0 },

			"accurancy" : 100e3,

			"agility" : 10e3,

			"hunger" : { "min" : 100 , "max" : 100 },

			"thirst" : { "min" : 100 , "max" : 100 }

		},

		/*Modificadores de los atributos de juego del Being*/
		"modificators" : { /* Replica de stats */ },

		/*Estado actual del Being*/
		"state": {

			"alive": true,
			"poisoned": false,
			"freezed": false,
			"stoned": false,

		},

		/*Artefactos equipados del Being*/
		"equipped":{
			"head" : false,
			"neck" : false,
			"body" : false,
			"rightHand": false,
			"leftHand": false,
		},

	}




	//----------------------------------------------------------------------------------
	// Creamos propiedades para "Modificators"
	//----------------------------------------------------------------------------------

	// Crea propiedades modificators ( replica de stats )
	var addProps = (function createModificators(){
		for( modificator in defaults.stats ){
			defaults.modificators[modificator] = { "min" : 0 , "max" : 0 };
		}
	})();



	//----------------------------------------------------------------------------------
	// Merge
	// Mezcla de los defaults con los parametros pasados al objeto
	//----------------------------------------------------------------------------------

	merge( defaults , params , this );




	//----------------------------------------------------------------------------------
	// Metodos
	//----------------------------------------------------------------------------------


}
