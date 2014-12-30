function Tierra( params ){

	extend( this , Being , params );

	var defaults = {
		"name": 'tierra',
		"descripcion": "Tierra común y silvestre",
		"solid": false
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

}