// Require modulos juego.
global.framework = require('class/framework.js').framework.bind( global );
framework();
global.World = require('class/World.js').World;
global.world = new World();

global.Being = require('class/Being.js').Being;
global.Terrain = require('class/Terrain.js').Terrain;
global.Artifact = require('class/Artifact.js').Artifact;
global.Elfo = require('class/beings/Elfo.js').Elfo;
global.Aguila = require('class/beings/Aguila.js').Aguila;
global.Tierra = require('class/terrains/Tierra.js').Tierra;
global.Agua = require('class/terrains/Agua.js').Agua;
global.Daga = require('class/artifacts/Daga.js').Daga;
global.Pollo = require('class/artifacts/Pollo.js').Pollo;
global.Manzana = require('class/artifacts/Manzana.js').Manzana;
global.Papiro = require('class/artifacts/Papiro.js').Papiro;
global.Escudo = require('class/artifacts/Escudo.js').Escudo;
global.Casco = require('class/artifacts/Casco.js').Casco;
global.PocionRoja = require('class/artifacts/PocionRoja.js').PocionRoja;
global.Tile = require('class/Tile.js').Tile;

world.create();

// Juego
	var temporalObject;

/*
	temporalObject = new Elfo({
		"position":{
			"x": 1,
			"y": 1
		},
		"name":"miElfo",
		"controls":"pc",
	})
	console.log(temporalObject.id);
	world.createdObjects[temporalObject.id] = temporalObject;
*/
/*
	temporalObject = new Elfo({
		"position":{
			"x": 20,
			"y": 1
		},
		"name":"elfo2",
		"controls":"npc",
	});
	world.createdObjects[temporalObject.id] = temporalObject;
*/

	temporalObject = new Daga({
		"position":{
			"x": 6,
			"y": 6
		},
		"name": "miDaga",
	});
	world.createdObjects[temporalObject.id] = temporalObject;

	temporalObject = new Daga({
		"position":{
			"x": 4,
			"y": 3
		},
		"name": "miDaga",
	});
	world.createdObjects[temporalObject.id] = temporalObject;

	temporalObject = new Daga({
		"position":{
			"x": 5,
			"y": 3
		},
		"name": "miDaga",
	});
	world.createdObjects[temporalObject.id] = temporalObject;

	(function(){
		var xpos;
		var ypos;
		for(var i = 0 ; i < 50 ; i++){
			xpos = Math.floor(Math.random()*10)+20;
			ypos = Math.floor(Math.random()*10)+20;
			if( !world.getTile({ "x" : xpos , "y" : ypos }).being ){
				temporalObject = new Aguila({
					"position":{
						"x": xpos,
						"y": ypos,
					},
					"controls":"npc",
					"name" : "bicho",
				});
			}else{
				i--;
			}
			console.log('bicho agregado num:',i)
			world.createdObjects[temporalObject.id] = temporalObject;
		}
	})()

/*
	temporalObject = new Aguila({
		"position":{
			"x": 1,
			"y": 18,
		},
		"controls":"npc",
		"name" : "bicho",
	});
	world.createdObjects[temporalObject.id] = temporalObject;
*/

	temporalObject = new Manzana({
		"position":{
			"x": 4,
			"y": 10,
		},
		"controls":"npc",
		"name" : "Manzana",
	});
	world.createdObjects[temporalObject.id] = temporalObject;

	temporalObject = new Escudo({
		"position":{
			"x": 7,
			"y": 4,
		},
		"controls":"npc",
		"name" : "Escudo",
	});
	world.createdObjects[temporalObject.id] = temporalObject;

	temporalObject = new Casco({
		"position":{
			"x": 4,
			"y": 5,
		},
		"controls":"npc",
		"name" : "Casco",
	});
	world.createdObjects[temporalObject.id] = temporalObject;

	temporalObject = new PocionRoja({
		"position":{
			"x": 18,
			"y": 4,
		},
		"controls":"npc",
		"name" : "PocionRoja",
	});
	world.createdObjects[temporalObject.id] = temporalObject;


//world.createdObjects.bicho.createArtifact({"artifact":Pollo});

test('MUNDO CARGADO!')
//test('npc')
//console.log(world.createdObjects.elfo2.position)
//console.log(world.getTile(world.createdObjects.elfo2.position))
//test('pj')
//console.log(world.createdObjects.miElfo)
//console.log(world.getTile(world.createdObjects.miElfo.position))
