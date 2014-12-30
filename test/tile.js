function Tile( params ){

	var defaults = {

		"terrain"	: null,
		"object"	: null,
		"being"		: null,

	}

	merge( defaults , params , this );

	// Agrega Elemento al tile ( terrain , object o being)
	this.append = function( params ){
		for(var type in params){
			this[type] = params[type];
		}

	}



}
