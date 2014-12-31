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
		if( this.inventory.length ){
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

	// Tira todos los objetos del inventario
	this.dropAll = function(){
		// Si existen items
		if( this.inventory.length ){
			var numItems = this.inventory.length;
			var freePositions = this.findFreePositions({ "numItems":numItems });

			console.log( 'objetos en inventario:',numItems );
			// Tira un item en cada posicion vacia.
			for(var i = 0 ; i < numItems ; i++ ){
				console.log('Se cae '+ this.inventory[i] +' en: '+freePositions[i])
				this.world.getTile( freePositions[i] ).artifact = this.inventory[i];
			}
			// Vacio inventario.
			this.inventory = [];
		}
	}

	// Encuentra posiciones libres alrededor del personaje. Segun la cantidad dada.
	this.findFreePositions = function( params ){

		var freePositions = []; // Posiciones donde tirar artifacts
		var toSearch = [ this.position ]; // Posiciones que va a verificar, empieza por donde esta parado.
		var full; // Ya esta ocupado ( actualmente )
		var used; // Ya esta ocupado ( futuro )
		var tile; // Lo uso para ver existencia del tile. (bordes del mapa)
		var position_up, position_right, position_down, position_left // Posiciones que verifica por cada position.

		// Mientras haya posiciones para verificar
		do{

			// Guarda posiciones de alrededor de la posicion a verificar
			position_up 	= { "x" : toSearch[0].x 		, "y" : toSearch[0].y - 1  	};
			position_right 	= { "x" : toSearch[0].x + 1 	, "y" : toSearch[0].y  		};
			position_down 	= { "x" : toSearch[0].x 		, "y" : toSearch[0].y + 1  	};
			position_left 	= { "x" : toSearch[0].x - 1 	, "y" : toSearch[0].y  		};
			
			// Checkea: 
			// 1 - Si existe el tile. 
			// 2 - Si esta siendo ocupado ahora por un artifact. (full)
			// 3 - Si esta reservado para tirar un artifact. (used)
			// 4 - Si el terrain es solid (has_floor)
			tile = this.world.getTile( toSearch[0] );
			if( tile ){
				full = tile.artifact;
				used = findPositionInArray({ "array" : freePositions , "position" : toSearch[0] })
				has_floor = tile.terrain.solid == false;

				if( !full && !used && has_floor ){
					freePositions.push( toSearch[0] );
				}
			}

			// Agrega posiciones a verificar de alrededor (son 4, en agujas del reloj)
			toSearch.push( position_up , position_right , position_down , position_left );

			// Cuando ya verifico la posicion, la borra del array verificar y continua
			toSearch.splice(0,1);

		// Antes de continuar verifica si hace falta buscar mas posiciones libres
		}while( params.numItems > freePositions.length );

 		// encontro suficientes posiciones y las devuelve
 		return freePositions;

	}

	this.dead = function(){
		console.log('Has muerto!')
		this.dropAll();
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
