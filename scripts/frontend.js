var juego = new Phaser.Game(600, 400, Phaser.AUTO ,'', { preload: preload, create: create, update: update });

var user = "";
var users = [];
var websocket = io.connect();
var ax = 0;
var ay = 0;

var pj;
var pjs;



//------------------------------------------------------------------------------------------------
// CLASES
//------------------------------------------------------------------------------------------------
function User(){
	this.nombre = '';
}

var usuario = new User();

usuario.nombre = prompt( 'nombre' );


//------------------------------------------------------------------------------------------------
// CONSULTAS AL SERVER
//------------------------------------------------------------------------------------------------
	
	//------------------------------------------------------------------------------------------------
	// LOGIN
	//------------------------------------------------------------------------------------------------
	window.onload = function iniciar(){
		
		websocket.emit( 'login' , usuario );

	}

	//------------------------------------------------------------------------------------------------
	// EJECUTA: Server.KeyPressed(char);
	//------------------------------------------------------------------------------------------------
	document.onkeypress = function (e) { 

	};




//------------------------------------------------------------------------------------------------
// RESPUESTAS DEL SERVER
//------------------------------------------------------------------------------------------------
	
	websocket.on( 'login_success' , login_success );
	websocket.on( 'actualizar_users' , actualizar_users );
	//websocket.on( 'actualizar_pos' , actualizar_pos );


	//------------------------------------------------------------------------------------------------
	// LOGIN OK
	//------------------------------------------------------------------------------------------------
	function login_success ( data ){
		usuario = data.users;

		crear_pj()
	}


	//------------------------------------------------------------------------------------------------
	// Actualiza Existencia de USUARIOS
	//------------------------------------------------------------------------------------------------
	function actualizar_users( data ){
		console.log(data)
		users = data.users;
		console.log(data.users);

		crear_demas_pj();

		/*
		console.log('salio o entro un user:')
		console.log( users );
		*/
	}

	function crear_demas_pj(){
		console.log('usuarios conectados:')
	    console.log( users )
	    console.log( users.length )

		// Demas pjs.
	    for( u = 0 ; u < users.length ; u++ ){
	    	console.log('renderizando', u);
	    	var pos = users[u].getPosition();
	    	var otrospj = pjs.create( pos.x , pos.y , 'pj' );
	    }
	}

	function crear_pj(){
	    //-------------------------------------
	    // CREAMOS PJ
	    //-------------------------------------

	    // Crea grupo de pjs
	    pjs = juego.add.group();
	    pjs.enableBody = true;
	    
	    // Pj actual.
	    //pj = juego.add.sprite(32, juego.world.height - 150, 'pj');
	    pj = pjs.create( usuario.posicion.x , usuario.posicion.y , 'pj' );
	}


	//------------------------------------------------------------------------------------------------
	// Actualiza Existencia de USUARIOS
	//------------------------------------------------------------------------------------------------
	/*function render_user( users ){

	}*/

	//------------------------------------------------------------------------------------------------
	// Actualiza POS
	//------------------------------------------------------------------------------------------------
	/*function actualizar_pos( users ){
		for( usr in users ){

		}
	}*/






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
        //pj.animations.play('left');

    }else if(cursors.right.isDown){

        pj.body.velocity.x = vel;
        //pj.animations.play('right');

    }
    if(cursors.up.isDown){

        pj.body.velocity.y = - vel;
        //pj.animations.play('right');

    }else if(cursors.down.isDown){

        pj.body.velocity.y = vel;
        //pj.animations.play('right');

    }else{
		/*
        pj.animations.stop();
        pj.frame = 4;
		*/
    }

}