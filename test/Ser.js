function Ser( params ){

	/*Constantes Globales*/
	if(!self.SER){
		self.SER = {};
	}
	/*-------------------*/

	var defaults = {

		/*Objeto que contiene el sprite de THREE.JS*/
		"sprite":null,

		/*Posicion del ser*/
		"position":{
			"x":0,
			"y":0
		},

		/*Angulo del ser*/
		"rotation":{
			"x":0,
			"y":0
		},

		/*Propiedad que define si el objeto puede ser atravesado*/
		"solid":false,

		/*Propiedad que define quien controla al Ser*/
		"controls":null,

		// no lo estamos usando, lo dejamos por si las moscas
		"world":null,

		"map":null
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	if( this.controls == "pc" ){
		var controls = new Controls();
		controls.eventsDown.up = (function(){this.mover({"y":-1})}).bind(this);
		controls.eventsDown.right = (function(){this.mover({"x":1})}).bind(this);
		controls.eventsDown.down = (function(){this.mover({"y":1})}).bind(this);
		controls.eventsDown.left = (function(){this.mover({"x":-1})}).bind(this);
		controls.init();
	}

	this.setMap = function( params ){
		this.map = params;
	}

	this.setMap( params.map );
	// Se agrega en el mapa
	this.map.getTile( this.position ).append({ 'being' : this })

	console.log(this)

	this.mover = function( params ){
		var x = params.x || 0;
		var y = params.y || 0;
		var lx = this.position.x;
		var ly = this.position.y;
		this.position = {"x":lx+x , "y":ly+y}
		console.log(this.position)
	}

}
