// comunicacion

/*
    Cargo las dependencias necesarias
*/
var express = require('express');
var app = express();
var expressHbs = require('express3-handlebars');
var http = require('http');
var socketio = require('socket.io');

/*
    Defino a handlebars como el engine de templates
*/
app.engine('hbs', expressHbs({extname:'hbs'/*, defaultLayout:'main.hbs'*/}));
app.set('view engine', 'hbs');

/*
    Defino el directorio donde van a estar los views
*/
app.set('views', __dirname + '/public/views');

/*
    Configuracion para que las rutas sean estaticas (Permite cargar css, js, etc...)
*/
app.use(express.static(__dirname));

/*
    Routes
*/
app.get('/', function(req, res){
  res.render('index');
});


/*
    Crea un nuevo servidor web
*/
var server = http.createServer(app).listen(80, function(){
  console.log("Inicio el servidor en el puerto 80");
});

/*
    Escucha peticiones al servidor a traves de socket.io
*/
global.io = socketio.listen(server);

// Plugins Node
global.colors = require('colors');

// Test - devuelve texto coloreado para la consola!
global.test = function( value ){
  console.log('');
  console.log( (value+'').bold.red.underline );
  console.log('');
}

// Cargo controllers
var userController = require('controllers/userController.js').userController;
var gameController = require('controllers/gameController.js').gameController;

// Cargo juego
require('./game.js');

/* ************************************************************************** */

/*
    Manejo de la comunicacion
*/
io.sockets.on('connection', function(socket){

  // Configuracion
  //socket.hearthbeatTimeout = 5000;
  io.set('heartbeat timeout', 25000);
  io.set('heartbeat interval', 60000);

  userController( socket );
  gameController( socket );

});
