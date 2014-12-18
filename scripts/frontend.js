var juego = new Phaser.Game(600, 400, Phaser.AUTO ,'', { preload: preload, create: create, update: update });

var user="";
var websocket = io.connect();
var ax = 0;
var ay = 0;



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
	function login_success ( svr_usuario ){
		usuario = svr_usuario;
	}


	//------------------------------------------------------------------------------------------------
	// Actualiza Existencia de USUARIOS
	//------------------------------------------------------------------------------------------------
	function actualizar_users( users ){
		/*
		console.log('salio o entro un user:')
		console.log( users );
		*/
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

    //-------------------------------------
    // CREAMOS PJ
    //-------------------------------------

    // Crea pj.
    pj = juego.add.sprite(32, juego.world.height - 150, 'pj');
    console.log( users )
    
    // Habilita leyes de fisica a pj
    juego.physics.arcade.enable(pj);

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