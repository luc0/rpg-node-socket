// Require modulos juego.
global.framework = require('class/framework.js').framework.bind( global );
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
global.World = require('class/World.js').World;

framework();


// Juego

global.world = new World();
world.createdObjects = {
	"miElfo" : new Elfo({
		"position":{
			"x": 1,
			"y": 1
		},
		"name":"miElfo",
		"controls":"pc",
	},world),

	"elfo2" : new Elfo({
		"position":{
			"x": 2,
			"y": 4
		},
		"name":"elfo2",
		"controls":"npc",
	},world),

	"miDaga" : new Daga({
		"position":{
			"x": 3,
			"y": 3
		},
		"name": "miDaga",	
	},world),

	"miDaga2" : new Daga({
		"position":{
			"x": 4,
			"y": 3
		},
		"name": "miDaga",	
	},world),
	
	"miDaga3" : new Daga({
		"position":{
			"x": 5,
			"y": 3
		},
		"name": "miDaga",	
	},world),

	"bicho" : new Aguila({
		"position":{
			"x": 3,
			"y": 3,
		},
		"controls":"npc",
		"name" : "bicho",
	},world),

	"Manzana" : new Manzana({
		"position":{
			"x": 4,
			"y": 10,
		},
		"controls":"npc",
		"name" : "Manzana",
	},world),

	"Escudo" : new Escudo({
		"position":{
			"x": 7,
			"y": 4,
		},
		"controls":"npc",
		"name" : "Escudo",
	},world),

	"Casco" : new Casco({
		"position":{
			"x": 4,
			"y": 5,
		},
		"controls":"npc",
		"name" : "Casco",
	},world),

	"PocionRoja" : new PocionRoja({
		"position":{
			"x": 18,
			"y": 4,
		},
		"controls":"npc",
		"name" : "PocionRoja",
	},world)
};

world.createdObjects.bicho.createArtifact({"artifact":Pollo});

test('MUNDO CARGADO!')
//test('npc')
//console.log(world.createdObjects.elfo2.position)
//console.log(world.getTile(world.createdObjects.elfo2.position))
//test('pj')
//console.log(world.createdObjects.miElfo)
//console.log(world.getTile(world.createdObjects.miElfo.position))
