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
})(self);
