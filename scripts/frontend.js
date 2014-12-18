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
var escenario = new Scenario();
var cuadrado = new Array();

usuario.nombre = prompt( 'nombre' );


//------------------------------------------------------------------------------------------------
// CONSULTAS AL SERVER
//------------------------------------------------------------------------------------------------
	
	//------------------------------------------------------------------------------------------------
	// LOGIN
	//------------------------------------------------------------------------------------------------
	window.onload = function iniciar(){
		websocket.emit( 'login' , usuario );
		
		window.ondevicemotion = function(event){
			var x = event.accelerationIncludingGravity.x;
			var y = event.accelerationIncludingGravity.y;
			if( Math.abs(x) > 3 ){
				ax += x/3
			}else{
				ax *= 0.9
			}
			if( Math.abs(y) > 3 ){
				ay += y/3
			}else{
				ay *= 0.9
			}
			websocket.emit( 'gravityMotion' , {'gx':ax,'gy':ay} );
		}
	}


	//------------------------------------------------------------------------------------------------
	// EJECUTA: Server.KeyPressed(char);
	//------------------------------------------------------------------------------------------------
	document.onkeypress = function (e) { 
		e = e || window.event; 
		var charCode = e.charCode || e.keyCode, 
			character = String.fromCharCode(charCode); 
		console.log( charCode )
		websocket.emit( 'keyPressed' , charCode );
	};




//------------------------------------------------------------------------------------------------
// RESPUESTAS DEL SERVER
//------------------------------------------------------------------------------------------------
	
	websocket.on( 'actualizar_pos' , actualizar_pos );
	websocket.on( 'actualizar_users' , actualizar_users );
	websocket.on( 'loginOk' , loginOk );


	//------------------------------------------------------------------------------------------------
	// LOGIN OK
	//------------------------------------------------------------------------------------------------
	function loginOk ( svr_usuario ){
		usuario = svr_usuario;
	}

	//------------------------------------------------------------------------------------------------
	// Actualiza Existencia de USUARIOS
	//------------------------------------------------------------------------------------------------
	function render_user( users ){
		console.log(users)
		var chatContenedor = document.getElementById( 'chat' );
		// Recorre usuarios y redibuja
		for( usr in users ){
			cuadrado[usr] = new Abeja();
			cuadrado[usr].position.x = users[usr].pos.x;
			cuadrado[usr].position.y = users[usr].pos.y;
			cuadrado[usr].nombre = users[usr].nombre;
			escenario.register( cuadrado[usr] )
			/*cuadrado = document.createElement('p');
			cuadrado.style.left=users[usr].pos.x+'px';
			cuadrado.style.top=users[usr].pos.y+'px';
			cuadrado.id=users[usr].nombre;
			cuadrado.innerHTML=users[usr].nombre;
			cuadrado.style.backgroundColor = users[usr].color;
			chatContenedor.appendChild(cuadrado);
			console.log('se creo el n°'+usr)*/
		}
		escenario.draw();

	}

	//------------------------------------------------------------------------------------------------
	// Actualiza POS
	//------------------------------------------------------------------------------------------------
	function actualizar_pos( users ){
		for( usr in users ){
			cuadrado[ usr ].position.x = users[ usr ].pos.x;
			cuadrado[ usr ].position.y = users[ usr ].pos.y;
			escenario.register( cuadrado[ usr ] );
			escenario.draw();
			/*cuadrado = document.getElementById( users[i].nombre );
			cuadrado.style.top = users[i].pos.y + 'px';
			cuadrado.style.left = users[i].pos.x + 'px';*/
		}
	}

	//------------------------------------------------------------------------------------------------
	// Actualiza Existencia de USUARIOS
	//------------------------------------------------------------------------------------------------
	function actualizar_users( users ){

		for( e in escenario.graphics){
			escenario.cleanReg();
		}
		cuadrado = [];
		render_user( users );

	}
