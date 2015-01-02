
// Modelo Artifact
function Artifact( params ){
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

		// no lo estamos usando, lo dejamos por si las moscas
		"world":null,

		"type":Artifact,

		// Indica si se puede usar el objeto
		"usable":false,

		// Indica si una vez usado el objeto desaparece
		"consumable":false
	}

	/*Mezcla de los defaults con los parametros pasados al objeto*/
	merge( defaults , params , this );

	this.setWorld = function( params ){
		this.world = params;
	}

	this.setWorld( params.world );

	this.use = function( params ){
		var author = params.author;
		// Si no puede usar el objeto envia un mensaje y termina
		if( !this.usable ) {
			author.think({"message":"No puedo usar este objeto"});
			return false;
		}

		// Si puede usarlo ejecuta lo siguiente
		author.isAffected({
			"stats":{
				this.modificators;
			}
		});

		author.think({"message":"Usé mi " + this.name + "."});
		return true;
	}

}
