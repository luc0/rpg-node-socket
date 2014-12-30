function Daga( params ){
	extend( this , Artifact , params );

	var defaults = {

		/*Nombre de la daga*/
		"name":"Daga"
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

}
