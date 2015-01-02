function Tile( params ){

	var defaults = {

		"terrain"	: null,
		"artifact"	: null,
		"being"		: null,

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
		console.log(this)
	}



}
