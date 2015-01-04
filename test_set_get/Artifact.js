
// Modelo Artifact
function Artifact( params ){
	var defaults = {

		/*Objeto que contiene el sprite de THREE.JS*/
		"sprite":null,


		/*Angulo del Being*/
		"rotation":{
			"x":0,
			"y":0
		},

		// no lo estamos usando, lo dejamos por si las moscas
		"world":null,

		"type":Artifact,

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
		"_position":{
			"x":0,
			"y":0
		},

		/*Propiedad que define si el objeto puede Being atravesado*/
		"_solid":false,

		// Indica si se puede usar el objeto
		"_usable":false,

		// Indica si una vez usado el objeto desaparece
		"_consumable":false,

		// Cantidad de items
		"_count" : 1,

		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		/*
			SETTERS Y GETTERS
		*/
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set position( value ){
			this._position = value;
		},
		get position(){
			return this._position;
		},
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set solid( value ){
			this._solid = value;
		},
		get solid(){
			return this._solid;
		},
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set usable( value ){
			this._usable = value;
		},
		get usable(){
			return this._usable;
		},
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set consumable( value ){
			this._consumable = value;
		},
		get consumable(){
			return this._consumable;
		},
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set count( value ){
			this._count = value;
		},
		get count(){
			return this._count;
		},
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	this.setWorld = function( params ){
		this.world = params;
	}

	this.setWorld( params.world );


}
