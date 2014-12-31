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

		"direction": 'up',

		/*Propiedad que define si el objeto puede Being atravesado*/
		"solid":true,

		/*Propiedad que define quien controla al Being*/
		"controls":null,

		// no lo estamos usando, lo dejamos por si las moscas
		"world":null,

		"type":Being,

		"damage": 6,

		"life": 20,

		"inventory": []

	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	this.createControls = function(){
		if( this.controls == "pc" ){
			this.controls = new Controls();

			this.controls.eventsDown.up = (function(){
				var lastPosition = this.position;
				this.move({"y":-1})
				this.direction = 'up';
				this.world.refresh({ "element":this , "lastPosition":lastPosition });
			}).bind(this);

			this.controls.eventsDown.right = (function(){
				var lastPosition = this.position;
				this.move({"x":1})
				this.direction = 'right';
				this.world.refresh({ "element":this , "lastPosition":lastPosition });
			}).bind(this);

			this.controls.eventsDown.down = (function(){
				var lastPosition = this.position;
				this.move({"y":1})
				this.direction = 'down';
				this.world.refresh({ "element":this , "lastPosition":lastPosition });
			}).bind(this);

			this.controls.eventsDown.left = (function(){
				var lastPosition = this.position;
				this.move({"x":-1})
				this.direction = 'left';
				this.world.refresh({ "element":this , "lastPosition":lastPosition });
			}).bind(this);

			this.controls.eventsDown.attack = (function(){
				this.attack();
			}).bind(this);

			// INVENTARIO
			this.controls.eventsDown.take = (function(){
				this.take();
			}).bind(this);

			// INVENTARIO
			this.controls.eventsDown.drop = (function(){
				this.drop();
			}).bind(this);

			this.controls.init();
		}
	}

	this.setWorld = function( params ){
		this.world = params;
	}

	this.setWorld( params.world );

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

	// Ataque meele
	this.attack = function(){
		switch( this.direction ){
			case 'up':
				var attack_position = { x:this.position.x , y: this.position.y - 1 };
				break;
			case 'right':
				var attack_position = { x:this.position.x + 1 , y: this.position.y };
				break;
			case 'down':
				var attack_position = { x:this.position.x , y: this.position.y + 1 };
				break;
			case 'left':
				var attack_position = { x:this.position.x - 1, y: this.position.y };
				break;
		}
		var target = this.world.getTile(attack_position ).being;
		if( target ){
			target.life -= this.damage;
			console.log('Auch!');
		}else{
			console.log('tiraste una piña al aire')
		}
	}

	// INVENTARIO
	this.take = function(){
		var artifact = this.world.getTile( this.position ).artifact;
		if( artifact ){
			this.inventory.push(artifact);
			this.world.getTile( this.position ).artifact = null;
			console.log(artifact.name+" adquirida!");
		}else{
			console.log('No hay nada ahi');
		}
		console.log(this.inventory)
	}

	// INVENTARIO
	this.drop = function(){
		// Si hay artifact para tirar al piso
		if( this.inventory[0] ){
			// Si hay espacio en el piso
			if( !this.world.getTile( this.position ).artifact ){
				var artifact_dropped = this.inventory[0];
				this.inventory.splice(0,1);
				this.world.getTile( this.position ).artifact = artifact_dropped;
				console.log(artifact_dropped.name+" lanzada al piso.")
			}else{
				console.log('No hay espacio en el piso.')
			}
		}else{
			console.log('No tenes artefactos para tirar.')
		}
		console.log(this.inventory)
	}

	this.dead = function(){
		console.log('Has muerto!')
	}

	// Verifica colision con cualquier elemento que sea solido.
	this.collision = function( params ){
		var actualTile = this.world.getTile( params.new_position );
		return (
			/*	Verifica colision con los bordes del escenario */
			this.boundaries( params.new_position ) ||
			/* Verifica colision con un ser y si el ser es solido */
			( actualTile.being		&&	actualTile.being.solid )	||
			/* Verifica colision con un terreno y si el terreno es solido */
			( actualTile.terrain	&&	actualTile.terrain.solid )	||
			/* Verifica colision con un artefacto y si el artefacto es solido */
			( actualTile.artifact	&& 	actualTile.artifact.solid )
		);
	}

	this.boundaries = function( new_position ){
		return ( new_position.x < 0 || new_position.x >= 30 || new_position.y < 0 || new_position.y >= 30 );
	}

}
