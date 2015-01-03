/*
	FRAMEWORK: FUNCIONES GENERALES
*/

/* MERGE: Mezcla de un objeto sobre un default */
(function (self){
	this.merge = function( origin , append , destiny ){
		var origin = origin || {};
		var append = append || {};
		for( var o in origin ){
			if( append[o] instanceof Object ){
				destiny[o] = destiny[o] || {}
				this.merge( origin[o] , append[o] , destiny[o] )
			}else{
				destiny[o] = append[o] || origin[o];
			}
		}
	}

	this.extend = function( destiny , origin , params ){
		var origin = new origin( params );
		for( prop in origin ){
			destiny[ prop ] = origin[ prop ];
		}
	}

	this.createArray = function( dx , dy , Obj ){
		var newArray = [];
		for( var x = 0 ; x < dx ; x++ ){
			newArray[x] = [];
			for( var y = 0 ; y < dy ; y++ ){
				newArray[x][y] = new Obj;
			}
		}
		return newArray;
	}

	this.cloneObject = function( o ){
		var params = {};
		this.merge( o , params , params );
		var newObject = new o.constructor( params );
		return newObject;
	}

	// Encuentra una position en un array. function( array , position )
	/*
	this.findPositionInArray = function( params ) {
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
