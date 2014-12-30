function Lava( params ){

	extend( this , Being , params );

	var defaults = {
		"name": 'lava',
		"descripcion": "Quema quema!",
		"solid": true
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

}