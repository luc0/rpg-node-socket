var express = require('express'),http = require('http');
var app = express();
var server = http.createServer(app);


app.set('views',__dirname + '/views');
app.configure(function(){
	app.use(express.static(__dirname));
});
app.get('/',function(req,res){
	res.render('test.jade',{layout:false});
});
var port = process.env.PORT || 5000;
server.listen(port);

global.io = require("socket.io").listen(server);

//------------------------------------------------------------------------------------------------
// VARS GLOBALES
//------------------------------------------------------------------------------------------------
global.users = {};


//------------------------------------------------------------------------------------------------
// Construyo APP
//------------------------------------------------------------------------------------------------
require('clases/User.js');
//var funciones = require('funciones');

//------------------------------------------------------------------------------------------------
// Recibe del cliente
//------------------------------------------------------------------------------------------------
require('controllers/usuarioController.js');

