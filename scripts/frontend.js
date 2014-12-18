var juego = new Phaser.Game(600, 400, Phaser.AUTO ,'', { preload: preload, create: create, update: update });

var websocket = io.connect();

var user = "";
var users = {};
var ax = 0;
var ay = 0;

var pj;
var pjs;





//------------------------------------------------------------------------------------------------
// CLASES
//------------------------------------------------------------------------------------------------

function User( options ){
	var options = options || {}

	// Definicion de parametros por default
	var defaults = {
		'username':'',
		'position':{'x':0 , 'y':0}
	}

	// Funcion que mergea las opciones con los defaults
	var extend = function(self){
		for( prop in defaults ){
			self[prop] = options[prop] || defaults[prop] || null;
		}
	}
  	extend(this);

	// Definicion de Metodos

	this.setPosition = function( position ){
		var position = position || {};
		this.position.x = position.x || position[0] || 0;
		this.position.y = position.y || position[1] || 0;
	}

	this.getPosition = function(){
		return {'x':this.position.x , 'y':this.position.y}
	}
}
/*
function User(){
	this.username = '';
}*/

var user = new User();

user.username = prompt( 'nombre' );


//------------------------------------------------------------------------------------------------
// ENVIOS AL SERVER
//------------------------------------------------------------------------------------------------
	
	//------------------------------------------------------------------------------------------------
	// LOGIN
	//------------------------------------------------------------------------------------------------
	window.onload = function iniciar(){
		
		websocket.emit( 'login' , user );

	}


	//-------------------------------------
    // Envia position
    //-------------------------------------
	function envia_position(){

		var data = { 
			'username' : user.username ,
			'position' : user.position
		}
		websocket.emit( 'user_position_update' , data );

	}




//------------------------------------------------------------------------------------------------
// RESPUESTAS DEL SERVER
//------------------------------------------------------------------------------------------------
	
	websocket.on( 'login_success' , login_success );
	websocket.on( 'users_update' , users_update );
	websocket.on( 'user_position_update' , user_position_update );


	//------------------------------------------------------------------------------------------------
	// LOGIN OK
	//------------------------------------------------------------------------------------------------
	function login_success ( data ){
		user = data.pj;
		create_pj()
	}


	//------------------------------------------------------------------------------------------------
	// Actualiza Existencia de USUARIOS
	//------------------------------------------------------------------------------------------------
	function users_update( data ){

		for( u in data.users ){
			if( data.users[u].username != user.username ){
				if( !(u in users) ){
					users[u] = new User( data.users[u] );
				}
			}
		}
		create_others_pj();

		/*
		console.log('salio o entro un user:')
		console.log( users );
		*/
	}


	function user_position_update( data ){
		var username = data.username;
		var position = data.position;

	}











//------------------------------------------------------------------------------------------------
// FUNCIONES phaser VIEW
//------------------------------------------------------------------------------------------------

	function create_others_pj(){
		console.log('usuarios conectados:', users)

		// Demas pjs.
	    for( u in users ){
	    	if( users[u].render ) continue;
	    	console.log('renderizando', u);
	    	var pos = users[u].getPosition();
	    	var otrospj = pjs.create( pos.x , pos.y , 'pj' );
	    	users[u].render = true;
	    }
	}

    //-------------------------------------
    // CREAMOS PJ
    //-------------------------------------
	function create_pj(){
	    // Crea grupo de pjs
	    pjs = juego.add.group();
	    pjs.enableBody = true;
	    // Pj actual.
	    //pj = juego.add.sprite(32, juego.world.height - 150, 'pj');
	    pj = pjs.create( user.position.x , user.position.y , 'pj' );
	}

















function preload(){
    // INDIVIDUOS
    juego.load.image('pj', 'graficos/abeja.png');
}

function create(){

	cursors = juego.input.keyboard.createCursorKeys();




    
    // Habilita leyes de fisica a pj
    //juego.physics.arcade.enable(pj);

}

var vel = 150;

function update(){


	pj.body.velocity.x = 0;
	pj.body.velocity.y = 0;

	if(cursors.left.isDown){

        pj.body.velocity.x = - vel;
        envia_position();
        //pj.animations.play('left');

    }else if(cursors.right.isDown){

        pj.body.velocity.x = vel;
        envia_position();
        //pj.animations.play('right');

    }
    if(cursors.up.isDown){

        pj.body.velocity.y = - vel;
        envia_position();
        //pj.animations.play('right');

    }else if(cursors.down.isDown){

        pj.body.velocity.y = vel;
        envia_position();
        //pj.animations.play('right');

    }else{
		/*
        pj.animations.stop();
        pj.frame = 4;
		*/
    }

}