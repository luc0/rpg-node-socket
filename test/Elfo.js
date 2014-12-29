function Elfo( params ){
	extend( this , Ser , params );

	var defaults = {

		/*Nombre del elfo*/
		"name":null
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

}
