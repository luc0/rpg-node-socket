/*
	FRAMEWORK: FUNCIONES GENERALES
*/

/* MERGE: Mezcla de un objeto sobre un default */
(function(self){

	self.getKeys = function( objects ){
		var allKeys = {};
		for( var o in objects){
			for( var key in objects[o]){
				allKeys[key] = null;
			}
		}
		return allKeys;
	}

	self.merge = function( base , added , merged ){
		var base = (base !== undefined ) ? base : {};
		var added = (added !== undefined ) ? added : {};

		var keys = getKeys( [ base , added ]);

		for( key in keys){
			if( (added[key] instanceof Object || base[key] instanceof Object)){
				// Si es array, valida para que no de error al estar undefined.
				if( (added[key] instanceof Array || base[key] instanceof Array) ){
					base[key] = (base[key] !== undefined) ? base[key] : [];
					added[key] = (added[key] !== undefined) ? added[key] : [];
					merged[key] = (merged[key] !== undefined) ? merged[key] : [];
				}else{
				// Si es object, valida para que no de error al estar undefined.
					base[key] = (base[key] !== undefined) ? base[key] : {};
					added[key] = (added[key] !== undefined) ? added[key] : {};
					merged[key] = (merged[key] !== undefined) ? merged[key] : {};
				}

				// Al tener elementos anidados, recorre dichos elementos.
				merge( base[key] , added[key] , merged[key] );

			}else{
				// No tiene elementos anidados, solo guarda las propiedades
				merged[key] = (added[key] !== undefined) ? added[key] : base[key];
			}
		}
	}

	self.extend = function( destiny , origin , params ){
		var origin = new origin( params );
		for( prop in origin ){
			destiny[ prop ] = origin[ prop ];
		}
	}

	self.createArray = function( dx , dy , Obj ){
		var newArray = [];
		for( var x = 0 ; x < dx ; x++ ){
			newArray[x] = [];
			for( var y = 0 ; y < dy ; y++ ){
				newArray[x][y] = new Obj;
			}
		}
		return newArray;
	}

	self.cloneObject = function( o ){
		var params = {};
		self.merge( o , params , params );
		var newObject = new o.constructor( params );
		return newObject;
	}

	self.inputPrompt = function( callback ){
		var div = document.createElement('div');
		div.innerHTML = "<div class='modal'><div><input id='input_value' type='text'></div><div><input id='input_button' type='button' value='Tirar'></div></div>";
		var modal = div.firstChild;
		var input_button = modal.querySelector('#input_button');
		var input_value = modal.querySelector('#input_value');
		input_button.onclick = function(){
			callback(+modal.querySelector('#input_value').value);
			modal.parentNode.removeChild(modal);
		}

		input_value.onchange = input_button.onclick;
		document.body.appendChild(modal);
		input_value.focus();
	}

	// Encuentra una position en un array. function( array , position )
	/*
	self.findPositionInArray = function( params ) {
		var array = params.array;
		var position = params.position;
	    for (var i = 0; i < array.length; i++) {
	        if (array[i]["x"] === position.x && array[i]["y"] === position.y) {
	            return array[i];
	        }
	    }
	    return null;
	}*/
})(self);
