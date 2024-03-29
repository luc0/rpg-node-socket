function Being( params ){

	/*Constantes Globales*/
	if(!self.Being){
		self.Being = {};
	}
	/*-------------------*/

	var defaults = {

		"type":Being,

		"world":null,

		/*Objeto que contiene el sprite de THREE.JS*/
		"sprite":null,


		/*Angulo del Being*/
		"rotation":{
			"x":0,
			"y":0
		},

		/*Propiedad que define quien controla al Being*/
		"controls":null,

		/*Propiedad que define si el objeto puede Being atravesado*/
		"solid":true,

		"provisorio":{ // Vars PROVISORIAS que se borraran con three
			"timerCamina": null
		},

		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		/*
			PROPIEDADES DE COMUNICACION: Las propiedades con el prefijo _
			utilizan setters y getters para clonar el valor asignado a cada
			propiedad en una lista de valores modificados.
			Luego sera enviad apor socket.
		*/
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

		/*Posicion del Being*/
		"_position":{
			"x":0,
			"y":0
		},

		/*Direccion del Being*/
		"_direction": 'up',

		/*Inventario del Being*/
		"_inventory": [],

		/*Atributos de juego del Being*/
		"_stats" : {

			"luck": 50e3,

			"level": { "min" : 1 , "max" : 50 },

			"experience": { "min" : 0 , "max" : 200 },

			"life": { "min" : 20 , "max" : 20 },

			"damage": { "min" : 2 , "max" : 4 },

			"critical" : 5e3,

			"shields": { "min" : 0 , "max" : 0 },

			"accurancy" : 100e3,

			"agility" : 10e3,

			"hunger" : { "min" : 100 , "max" : 100 },

			"thirst" : { "min" : 100 , "max" : 100 }

		},

		/*Modificadores de los atributos de juego del Being*/
		"_modificators" : { /* Replica de stats */ },

		/*Estado actual del Being*/
		"_state": {

			"alive": true,
			"poisoned": false,
			"freezed": false,
			"stoned": false,

		},

		/*Artefactos equipados del Being*/
		"_equipped":{
			"head" : false,
			"neck" : false,
			"body" : false,
			"rightHand": false,
			"leftHand": false,
		},

		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		/*
			SETTERS Y GETTERS
		*/
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set position( value ){
			this._position = value;

			/* Ejemplo de agregado a cola de comunicacion */
			/*
			SERVER.queue({ "user":this.name , "property":"position" , "value" = value });
			*/
		},
		get position(){
			return this._position;
		},
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set direction( value ){
			this._direction = value;
		},
		get direction(){
			return this._direction;
		},
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set inventory( value ){
			this._inventory = value;
		},
		get inventory(){
			return this._inventory;
		},
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set stats( value ){
			this._stats = value;
		},
		get stats(){
			return this._stats;
		},
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set modificators( value ){
			this._modificators = value;
		},
		get modificators(){
			return this._modificators;
		},
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set state( value ){
			this._state = value;
		},
		get state(){
			return this._state;
		},
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
		set equipped( value ){
			this._equipped = value;
		},
		get equipped(){
			return this._equipped;
		},
		/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
	}

	// Crea propiedades modificators ( replica de stats )
	var addProps = (function createModificators(){
		for( modificator in defaults.stats ){
			defaults.modificators[modificator] = { "min" : 0 , "max" : 0 };
		}
	})();

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

		}else if(this.controls == "npc"){
			var movement;
			var follow = function(){
				var lastPosition = this.position;
				//console.log( this.findNearest({ "target" : "being" }) );
				var destiny = this.findNearest({ "target" : "being" });
				if( destiny ){
					movement = this.goTo({ "destiny" : destiny });
					if( !movement.success ){
						console.log('oh!, algo bloquea mi camino!');
						if( movement.colision.being && movement.colision.being.controls != 'npc' ){
							console.log('Es un being!, a darle murra!')
							movement.colision.being.isAffected({
								"stats" : {
									"life": {
										"min":- this.calculeStat({ "stat" : "damage" , "target" : movement.colision.being }),
									}
								} ,
								/* Provisorio para que ataque, ahora los parametros estan dentro de stats, habria que recorrer ese array*/
								"author" : this
							});
						}
					}
				}
				this.world.refresh({ "element":this , "lastPosition":lastPosition });
			}
			this.provisorio.timerCamina = setInterval( follow.bind(this), 1000); // previsorio ( hacer intervalo con three )

		}
	}

	this.goTo = function( params ){
		var destiny = params.destiny;
		//console.log('destiny',destiny)
		if( destiny.x < this.position.x ){
			this.direction = 'left';
			return this.move({"x":-1});
		}
		if( destiny.x > this.position.x ){
			this.direction = 'right';
			return this.move({"x":+1});
		}
		if( destiny.y > this.position.y ){
			this.direction = 'down';
			return this.move({"y":+1});
		}
		if( destiny.y < this.position.y ){
			this.direction = 'up';
			return this.move({"y":-1});
		}
		//destiny.y > this.position.y ? {"y":+1} : {"y":-1};
	}

	this.findNearest = function( params ){

		var target = params.target;

		var npc_vision = 15; // Radio de tiles que busca el npc
		var tile, has_floor, has_target;
		var taget_position = null;
		var forgetPositions = {};  // posiciones que ya miro y no encontro nada.
		var toSearch = [ this.position ]; // Posiciones que va a verificar, empieza por donde esta parado.
		var position_cardinal = [];
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
			// 2 - Si el terrain es solid (has_floor)
			// 3 - Si hay un target (has_target)
			tile = this.world.getTile( toSearch[0] );
			if( tile ){
				has_floor = tile.terrain.solid == false;
				if( tile[target] ){
					has_target = tile[ target ].controls != 'npc';
				}

				if( has_floor && has_target ){
					var target_position = toSearch[0];
					break;
				}
			}

			// Si ya tengo todas las posiciones necesarias, listo.
			if( this.position.y - npc_vision >= position_up.y ){
				break;
			}

			// Agrega posiciones a verificar de alrededor (son 4, en agujas del reloj) antes verifica si ya las miro.
			position_cardinal = [ position_up , position_right , position_down , position_left ];
			for( var p in position_cardinal ){
				if( !(('p' + position_cardinal[p].x + '-' + position_cardinal[p].y ) in forgetPositions) ){
					forgetPositions[ 'p' + position_cardinal[p].x + '-' + position_cardinal[p].y ] = null;
					toSearch.push( position_cardinal[p] );
				}
			}


			// Cuando ya verifico la posicion, la borra del array verificar y continua
			toSearch.splice(0,1);

		// Antes de continuar verifica si hace falta buscar mas posiciones libres
		}while( this.position.y - npc_vision < position_up.y );

		forgetPositions = null;
 		// encontro suficientes posiciones y las devuelve
 		return target_position;

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
			return { "success" : true }
		}

		// devuelve objeto con el que colisiona
		return { "success" : false , "colision" : world.getTile( new_position ) }
	}


	//------------------------------------------------------------------------------------------------------
	// LUCHA
	//------------------------------------------------------------------------------------------------------

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
		var target = this.world.getTile( attack_position ).being;
		if( target ){
			target.isAffected({
				"stats" : {
					"life": {
						"min":- this.calculeStat({ "stat" : "damage" , "target" : target }),
					}
				} ,
				/* Provisorio para que ataque, ahora los parametros estan dentro de stats, habria que recorrer ese array*/
				"author" : this
			});
		}else{
			console.log('tiraste una piña al aire')
		}
	}

	// Suma stats con sus modificadores
	this.calculeStat = function( params ){
		var target = params.target || {};
		var stat = params.stat;
		var value = this.stats[ stat ].min;
		// Calcula base_damage
		if( stat == 'damage' ){

			// Mi Daño
			var damage_min = this.stats[ stat ].min + this.modificators[ stat ].min;
			var damage_max = this.stats[ stat ].max + this.modificators[ stat ].max;
			// Escudo del enemigo
			var shields_min = target.stats[ 'shields' ].min + target.modificators[ 'shields' ].min;
			var shields_max = target.stats[ 'shields' ].max + target.modificators[ 'shields' ].max;



			// Devuelve 1 si le emboco, 0 si le pifio
			var hitted = Math.random() < this.stats.accurancy / 100e3 ? 1 : 0;

			if( hitted ){

				// Calculo mi daño
				value = this.randomRange( damage_min , damage_max );
				// Resto escudos del enemigo
				value -= this.randomRange( shields_min , shields_max );
				value = (value > 0 ? value : 0);

				console.log('le has infligido daño: ' , value)
				return value;

			}else{
				console.log('pifiaste')
				return 0; // temporal, enviar despues si pifio.
			}
		}

		return value;

	}

	// Devuelve un numero al azar entre 2 numeros
	this.randomRange = function( val1 , val2 ){
		return Math.round( ( val1 - 0.49 ) + ( val2 - val1 + 0.49 ) * Math.random() );
	}

	// Afecta a los stats
	this.isAffected = function( params ){
		var stats = params.stats;
		var author = params.author;


		for( var stat in stats){

			// Escepciones:
			if( stat == 'life' ){ // Si supera a la vida max, vida min es igualada a vida max.
				if( (this.stats[stat].min + stats[stat].min) > this.stats[stat].max ){
					this.stats[stat].min = this.stats[stat].max
					continue;
				}
			}

			// General
			this.stats[stat].min += stats[stat].min || 0;
			this.stats[stat].max += stats[stat].max || 0;

		}

		for( var stat in stats){
			if( this[stat+"Event"] ){
				this[stat+"Event"]( {"author":author} );
			}else{
				throw new Error('no existe la funcion '+stat+"Event")
			}
		}
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
		var forgetPositions = {}; // Posiciones donde tirar artifacts
		var toSearch = [ this.position ]; // Posiciones que va a verificar, empieza por donde esta parado.
		var full; // Ya esta ocupado ( actualmente )
		var used; // Ya esta ocupado ( futuro )
		var tile; // Lo uso para ver existencia del tile. (bordes del mapa)
		var position_cardinal = [];
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
			// 3 - Si el terrain es solid (has_floor)
			tile = this.world.getTile( toSearch[0] );
			if( tile ){
				full = tile.artifact;
				has_floor = tile.terrain.solid == false;

				if( !full && has_floor ){
					freePositions.push( toSearch[0] );
				}
			}

			// Si ya tengo todas las posiciones necesarias, listo.
			if( params.numItems <= freePositions.length ){
				break;
			}

			// Agrega posiciones a verificar de alrededor (son 4, en agujas del reloj) antes verifica si ya las miro.
			position_cardinal = [ position_up , position_right , position_down , position_left ];
			for( var p in position_cardinal ){
				if( !(('p' + position_cardinal[p].x + '-' + position_cardinal[p].y ) in forgetPositions) ){
					forgetPositions[ 'p' + position_cardinal[p].x + '-' + position_cardinal[p].y ] = null;
					toSearch.push( position_cardinal[p] );
				}
			}
			// Cuando ya verifico la posicion, la borra del array verificar y continua
			toSearch.splice(0,1);

		// Antes de continuar verifica si hace falta buscar mas posiciones libres (ya lo hace antes pero por las dudas)
		}while( params.numItems > freePositions.length );

 		// encontro suficientes posiciones y las devuelve
 		return freePositions;

	}

	// Dar experiencia al que me mato.
	this.giveExperience = function( params ){
		params.author.isAffected({ "stats":{ "experience": {"min": +this.calculeStat({ "stat" : "points" })} } });
		console.log('Experiencia: ',params.author.stats.experience);
	}

	this.dead = function(){
		this.dropAll();
		this.state.alive = false;
		if( this.controls == 'npc' ){
			clearInterval(this.provisorio.timerCamina);
			this.remove();
		}else if( this.controls != 'npc' ){ // si es pc
			this.remove(); // temporal
		}
	}

	// Remueve todas las instancias del objeto ( en world y en el tile )
	this.remove = function(){

		this.world.removeObject({ "object" : this })
		this.world.getTile( this.position ).remove({ "type" : "being" });
	}



	//------------------------------------------------------------------------------------------------------
	// ACCIONES
	//------------------------------------------------------------------------------------------------------

	// Tomar objetos del piso
	this.take = function(){
		var artifact = this.world.getTile( this.position ).artifact;
		if( artifact ){

			// Si existe en inventario, suma cantidad
			for( var item in this.inventory ){
				if( this.inventory[item].constructor === artifact.constructor ){
					this.inventory[item].count += artifact.count ;
					this.world.getTile( this.position ).artifact = null;
					console.log(artifact.name+" adquirida!");
					return true;
				}
			}
			// Si no lo tiene en inventario..
			this.inventory.push(artifact);
			this.world.getTile( this.position ).artifact = null;
			console.log(artifact.name+" adquirida!");

		}else{
			console.log('No hay nada ahi');
		}
		console.log(this.inventory)
	}

	// Tirar objeto al piso
	this.drop = function( params ){
		var params = params || {};
		var dropAmount = 1;
		var tileArtifact = this.world.getTile( this.position ).artifact;
		// Si no tiene equipado el artifact
		if( !this.isEquipped({"artifact" : this.inventory[0]}) ){
			// Si hay artifact para tirar al piso
			if( this.inventory.length ){
				// Si hay espacio en el piso, o si esta ocupado pero es el mismo item,  entonces puede tirarlo.
				if( !tileArtifact || tileArtifact.construct == this.inventory[0].construct ){
					var artifact_dropped = this.inventory[0];
					artifact_dropped.position = this.position;

					// Si tiro mas de 1, resto cantidad
					if( artifact_dropped.count > 1 ){
						// params.dropAmount sirve para un futuro, lo otro pide un numero ( si no es mayor a 1 entonces lo toma como 1 igual)
						dropAmount = + params.dropAmount || + Math.max( parseInt(prompt('Cantidad a tirar')) || 1 , 1 );
					}

					// Si tiro todos los que tengo, borra del inventario y lo deja en el piso
					if( artifact_dropped.count == 1 || artifact_dropped.count <= dropAmount ){
						this.inventory.splice(0,1);
						// Si ya hay un item igual en el piso, le suma cantidad
						if( tileArtifact ){
							tileArtifact.count += dropAmount;
						}else{
							this.world.getTile( this.position ).artifact = artifact_dropped;
						}
					}else{
					// Si tiro mas de 1, le agrega cuantos va a haber en el piso, y cuantos se le descuenta al inventario
						this.inventory[0].count -= dropAmount;
						// Si ya hay un item igual en el piso, le suma cantidad
						if( tileArtifact ){
							tileArtifact.count += dropAmount;
						}else{
						// De lo contrario, clona el artifact
							var clonedArtifact = cloneObject( artifact_dropped );
							clonedArtifact.count = dropAmount;
							tileArtifact = clonedArtifact;
						}

					}


					console.log(artifact_dropped.name+" lanzada al piso.");
				}else{
					console.log('No hay espacio en el piso.');
				}
			}else{
				console.log('No tenes artefactos para tirar.');
			}
		}else{
			console.log('Tenes equipado el artifact');
		}
		console.log(this.inventory);
	}


	this.equip = function( params ){
		var artifact = this.inventory[ params.slot ];
		var placeEquip = this.canEquip({ "artifact" : artifact });

		// Si no existe nada equipado en el mismo lugar
		for( var place in placeEquip ){
			// Equipa
			this.equipped[placeEquip[place]] = artifact;
			console.log("equipado")
		}

		// Agrega modificadores del objeto al being
		for( modificator in artifact.modificators ){
			this.modificators[ modificator ].min = artifact.modificators[ modificator ].min;
			this.modificators[ modificator ].max = artifact.modificators[ modificator ].max;
		}

	}

	this.unEquip = function( params ){
		var artifact = this.inventory[ params.slot ];
		// Verifica si ya tiene equipado ese mismo objeto
		if( this.isEquipped({ "artifact" : artifact }) ){
			// Busca en donde se equipa el objeto y lo desequipa
			for( var place in artifact.equipable){
				this.equipped[artifact.equipable[place]] = false;
				console.log("desequipado")
			}
		}

		// Resetea modificadores
		for( modificator in artifact.modificators ){
			this.modificators[ modificator ].min = 0;
			this.modificators[ modificator ].max = 0;
		}
	}

	// Verifica si esta equipado
	this.isEquipped = function( params ){
		var artifact = params.artifact;
		// Verifica la parte del cuerpo donde se equipa el objeto y compara con el objeto que ya esta equipado, para ver si es el mismo.
		for( var place in artifact.equipable){
			if( this.equipped[artifact.equipable[place]] == artifact ){
				return true;
			}
		}
		console.log('Nada para desequipar')
		return false;
	}

	// Verifica si puede equipar
	this.canEquip = function( params ){
		var artifact = params.artifact;
		var canEquip = [];

		// Verifica la parte del cuerpo donde se equipa y se fija si ya hay algo equipado.
		for( var place in artifact.equipable){
			if( this.equipped[artifact.equipable[place]] ){
				console.log('Ya tenes algo equipado ahi.')
				return false;
			}
			canEquip.push( artifact.equipable[place] );
		}
		return canEquip;
	}

	/*
		Usar un objeto
	*/

	this.use = function( params ){
		// Si no puede usar el objeto envia un mensaje y termina
		var artifact = this.inventory[params.slot];
		if( !artifact.usable ) {
			this.think({"message":"No puedo usar este objeto"});
			return false;
		}

		// Si puede usarlo ejecuta lo siguiente
		var stats = {}
		for( var modificator in artifact.modificators ){
			stats[modificator] = artifact.modificators[modificator];
		}
		this.isAffected({
			"stats":stats,
			"author":artifact
		});

		this.think({"message":"Usé mi " + artifact.name + "."});

		if(artifact.consumable){
			console.log("borrando ");
			this.world.removeObject({"object":artifact});
			this.inventory[params.slot] = null;
		}
		return true;
	}
	/*
		PROVISORIO
	*/

	this.createArtifact = function( params ){
		var artifact = params.artifact;

		var newArtifact = new artifact({"world":this.world , "position":this.position});

		this.take();
	}


	//------------------------------------------------------------------------------------------------------
	// ACCIONES PASIVAS
	//------------------------------------------------------------------------------------------------------

	// Mensajes con informacion de las interacciones. ( Feedback para el usuario )
	this.think = function( params ){
		var message = params.message;
		alert( message );
	}

	this.refreshOrganism = function( ){

		var hunger = setInterval(function(){
			this.stats.hunger.min -= 2;
			this.stats.thirst.min -= 4;
		},18000);

	}

	//------------------------------------------------------------------------------------------------------
	// Events: disparan eventos segun el valor de las propiedades
	//------------------------------------------------------------------------------------------------------

	// Subir de nivel
	this.experienceEvent = function(){
		if( this.stats.experience.min >= this.stats.experience.max ){
			this.think({ "message" : 'He leveado!'})
			// Experiencia
			this.stats.experience.min -= this.stats.experience.max;
			this.stats.experience.max *= this.world.stats.levelGrowth.experience;
			// Level
			this.stats.level.min ++;
			// Mejorar stats
			this.stats.life.min = this.stats.life.max += this.world.stats.levelGrowth.life;
			this.stats.damage.min += this.world.stats.levelGrowth.damage;
			this.stats.damage.max += this.world.stats.levelGrowth.damage;
		}
	}

	// Morir de hambre
	this.hungerEvent = function(){

	}

	// Morir de sed
	this.thristEvent = function(){

	}

	// Cada vez que se le modifica la vida.
	this.lifeEvent = function( params ){
		console.log("lega y es " , this.stats.life)
		if( this.stats.life.min <=0 ){
			this.dead();
			this.giveExperience({ "author" : params.author });
			console.debug('Te mato ' + params.author.name )
		}
	}

	/*
		Funcion provisoria
	*/
	this.statsEvent = function(){}

	this.authorEvent = function(){}


	//------------------------------------------------------------------------------------------------------
	// Fisica
	//------------------------------------------------------------------------------------------------------

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

	// Bordes del mapa
	this.boundaries = function( new_position ){
		return ( new_position.x < 0 || new_position.x >= 30 || new_position.y < 0 || new_position.y >= 30 );
	}

}
