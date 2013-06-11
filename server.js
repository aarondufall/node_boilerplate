//4 line web server
var connect = require('connect');
connect.createServer(
  connect.static(__dirname+'/public')
).listen(8080);

//node packages
var  util = require("util"),
       io = require("socket.io");


function init() {
  socket = io.listen(8000);
  socket.configure(function() {
    socket.set("tranpsorts", ["websocket"]); //type of connections that are accepted
    socket.set("log level", 2); //log level 2 - info
  });
  setEventHandlers();
};

var setEventHandlers = function() {
  socket.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(client) {
  util.log("New client has connected!!:) "+ client.id);
  client.on("disconnect", onClientDisconnect);
  client.on("new client", onNewClient)
  //insert event listeners
};

//test connection bounce back
function onNewClient () {
	var clientID = this.id
	this.emit("wasup", {wasup: clientID});
	this.broadcast.emit("wasup", {wasup: clientID});
}


function onClientDisconnect() {
	util.log('Client disconnected ID:' + this.id )
}

init();

