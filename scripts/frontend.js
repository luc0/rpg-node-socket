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
	function send_position(){

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
		for( d in data.pj ){
			user[d] = data.pj[d];
		}
		//user = data.pj;
		create_pj()
	}


	//------------------------------------------------------------------------------------------------
	// Actualiza Existencia de USUARIOS
	//------------------------------------------------------------------------------------------------
	function users_update( data ){
		console.log(data)
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

		// Si me movi yo
		if( username == user.username ){
			console.log(user)
			user.setPosition( position );
			user.phaser_sprite.position = position;
			return;
		}

		// Otros pj
		users[ username ].setPosition( position );
		users[ username ].phaser_sprite.position = position;



	}











//------------------------------------------------------------------------------------------------
// FUNCIONES phaser VIEW
//------------------------------------------------------------------------------------------------

	function create_others_pj(){
		console.log('usuarios conectados:', users)

		// Demas pjs.
	    for( u in users ){
	    	if( users[u].render ) continue;

	    	var pos = users[u].getPosition();
	    	var otherpj = pjs.create( pos.x , pos.y , 'pj' );
	    	
	    	juego.physics.arcade.enable(otherpj);
	    	otherpj.body.bounce.y = 0.25;
	    	otherpj.body.gravity.y = 1000;
    		otherpj.body.collideWorldBounds = true;

	    	users[u].phaser_sprite = otherpj
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
	    pj = pjs.create( user.position.x , user.position.y , 'pj' );

	    juego.physics.arcade.enable(pj);
	    
	    pj.body.bounce.y = 0.25;
    	pj.body.gravity.y = 1000;
    	pj.body.collideWorldBounds = true;
    	


	    user.phaser_sprite = pj;

	}

















function preload(){
    // INDIVIDUOS
    juego.load.image('pj', 'graficos/abeja.png');
    juego.load.image('piso', 'graficos/piso.png');
}

function create(){

	cursors = juego.input.keyboard.createCursorKeys();
	
	juego.physics.startSystem(Phaser.Physics.ARCADE);

    plataforma = juego.add.group();

    // Habilitamos fisicas para todos los objetos del grupo
    plataforma.enableBody = true;

    // Creamos PISO, como un objeto de plataforma en pos x,y, con sprite 'piso'
    var piso = plataforma.create( 0 , juego.world.height - 24 , 'piso' );
    piso.scale.setTo(100,2);
    // Podes pisarlo y no se cae.
    piso.body.immovable = true;
/*
    pjs.setAll('body.bounce.y', 0.25);
	pjs.setAll('body.gravity.y', 2000);*/
    // Habilita leyes de fisica a pj
    //juego.physics.arcade.enable(pj);

}

var vel = 150;

function update(){

	juego.physics.arcade.collide( pj , plataforma );
	juego.physics.arcade.collide( pj , pjs );

	pj.body.velocity.x = 0;
	pj.body.velocity.y = 0;

	if(cursors.left.isDown){

        pj.body.velocity.x = - vel;
        user.setPosition( pj.body.position );
        send_position();
        //pj.animations.play('left');

    }else if(cursors.right.isDown){

        pj.body.velocity.x = vel;
        user.setPosition( pj.body.position );
        send_position();
        //pj.animations.play('right');

    }


    if(cursors.up.isDown && pj.body.touching.down){
        pj.body.velocity.y = - 3500;
    }

}