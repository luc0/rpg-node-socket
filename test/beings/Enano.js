function Enano( params ){
	extend( this , Being , params );

	var defaults = {

		/*Nombre del elfo*/
		"name":null
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

}
