function Tile( params ){

	var defaults = {

		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		/*
			PROPIEDADES DE COMUNICACION: Las propiedades con el prefijo _
			utilizan setters y getters para clonar el valor asignado a cada
			propiedad en una lista de valores modificados.
			Luego sera enviad apor socket.
		*/
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

		"_terrain"	: null,
		"_artifact"	: null,
		"_being"	: null,

		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		/*
			SETTERS Y GETTERS
		*/
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set terrain( value ){
			this._terrain = value;
		},
		get terrain(){
			return this._terrain;
		},
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set artifact( value ){
			this._artifact = value;
		},
		get artifact(){
			return this._artifact;
		},
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set being( value ){
			this._being = value;
		},

		get being(){
			return this._being;
		},
	}

	merge( defaults , params , this );

	// Agrega Elemento al tile ( terrain , object o being)
	this.append = function( params ){
		for(var type in params){
			this[type] = params[type];
		}

	}

	this.remove = function( params ){
		this[params.type] = null;
	}



}
