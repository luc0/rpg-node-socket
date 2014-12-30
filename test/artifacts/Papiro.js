function Papiro( params ){
	extend( this , Artifact , params );

	var defaults = {

		/*Nombre del papiro*/
		"name":"Papiro"
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

}
