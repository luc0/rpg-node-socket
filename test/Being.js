function Being( params ){

	/*Constantes Globales*/
	if(!self.Being){
		self.Being = {};
	}
	/*-------------------*/

	var defaults = {

		/*Objeto que contiene el sprite de THREE.JS*/
		"sprite":null,

		/*Posicion del Being*/
		"position":{
			"x":0,
			"y":0
		},

		/*Angulo del Being*/
		"rotation":{
			"x":0,
			"y":0
		},

		/*Propiedad que define si el objeto puede Being atravesado*/
		"solid":false,

		/*Propiedad que define quien controla al Being*/
		"controls":null,

		// no lo estamos usando, lo dejamos por si las moscas
		"world":null,

		"map":null,

		"type":Being
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	if( this.controls == "pc" ){
		var controls = new Controls();

		controls.eventsDown.up = (function(){
			var lastPosition = this.position;
			this.move({"y":-1})
			this.map.refresh({ "element":this , "lastPosition":lastPosition });
		}).bind(this);

		controls.eventsDown.right = (function(){
			var lastPosition = this.position;
			this.move({"x":1})
			this.map.refresh({ "element":this , "lastPosition":lastPosition });
		}).bind(this);

		controls.eventsDown.down = (function(){
			var lastPosition = this.position;
			this.move({"y":1})
			this.map.refresh({ "element":this , "lastPosition":lastPosition });
		}).bind(this);

		controls.eventsDown.left = (function(){
			var lastPosition = this.position;
			this.move({"x":-1})
			this.map.refresh({ "element":this , "lastPosition":lastPosition });
		}).bind(this);

		controls.init();
	}

	this.setMap = function( params ){
		this.map = params;
	}

	this.setMap( params.map );
	// Se agrega en el mapa
	this.map.getTile( this.position ).append({ 'being' : this })


	this.move = function( params ){
		var x = params.x || 0;
		var y = params.y || 0;
		var lx = this.position.x;
		var ly = this.position.y;

		var new_position = { "x" : lx+x , "y" : ly+y};

		if( !this.collision({ "new_position": new_position }) ){
			this.position = new_position;
		}
	}

	// Verifica colision con cualquier elemento que sea solido.
	this.collision = function( params ){
		return this.boundaries( params.new_position) || this.map.getTile( params.new_position ).being ;
		// hacer lo mismo con terrain y object
	}

	this.boundaries = function( new_position ){
		return ( new_position.x < 0 || new_position.x >= 30 || new_position.y < 0 || new_position.y >= 30 );
	}

}
