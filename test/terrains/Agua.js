function Agua( params ){

	extend( this , Being , params );

	var defaults = {
		"name": 'agua',
		"descripcion": "Agua profunda",
		"solid": true
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

}