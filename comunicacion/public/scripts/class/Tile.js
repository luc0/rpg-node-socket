var Tile = function( params ){

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

		"terrain"	: null,
		"artifact"	: null,
		"being"	: null,

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
