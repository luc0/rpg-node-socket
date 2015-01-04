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

var world = new World();

world.createdObjects = {
	"miElfo" : new Elfo({
		"position":{
			"x": 1,
			"y": 1
		},
		"name":"miElfo",
		"controls":"pc",
		"world": world
	}),

	"elfo2" : new Elfo({
		"position":{
			"x": 4,
			"y": 5
		},
		"name":"elfo2",
		"controls":"npc",
		"world": world
	}),

	"miDaga" : new Daga({
		"position":{
			"x": 3,
			"y": 3
		},
		"name": "miDaga",
		"world": world
	}),
	"miDaga2" : new Daga({
		"position":{
			"x": 4,
			"y": 3
		},
		"name": "miDaga",
		"world": world
	}),
	"miDaga3" : new Daga({
		"position":{
			"x": 5,
			"y": 3
		},
		"name": "miDaga",
		"world": world
	}),

	"bicho" : new Aguila({
		"position":{
			"x": 3,
			"y": 10,
		},
		"controls":"npc",
		"name" : "bicho",
		"world": world,
	}),

	"Manzana" : new Manzana({
		"position":{
			"x": 4,
			"y": 10,
		},
		"controls":"npc",
		"name" : "Manzana",
		"world": world,
	}),

	"Escudo" : new Escudo({
		"position":{
			"x": 7,
			"y": 4,
		},
		"controls":"npc",
		"name" : "Escudo",
		"world": world,
	}),

	"Casco" : new Casco({
		"position":{
			"x": 4,
			"y": 5,
		},
		"controls":"npc",
		"name" : "Casco",
		"world": world,
	}),

	"PocionRoja" : new PocionRoja({
		"position":{
			"x": 18,
			"y": 4,
		},
		"controls":"npc",
		"name" : "PocionRoja",
		"world": world,
	})
};


world.createdObjects.bicho.createArtifact({"artifact":Pollo});