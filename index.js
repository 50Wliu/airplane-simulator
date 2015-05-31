var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var usernames = {};

var rooms = ["FFA"];

var sPlanes = {};
app.use(express.static(__dirname + '/public'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.sockets.on('connection', function(socket) {
  socket.on('join', function(username) {
    tracker();
    socket.username = username;
    socket.room = 'FFA';
    usernames[username] = username;
    socket.join('FFA');
    var x = Math.random()*10;
    var y = Math.random()*10;
    var z = Math.random()*10;
    sPlanes[username] = {x:x, y:y, z:z, speedx:0, speedy:0, speedz:0, acc:0.02};
    io.sockets["in"](socket.room).emit("load plane",  sPlanes);
    console.log("user " + username + " has connected!");
    socket.on('disconnect', function(){
      console.log("user " + username + " has disconnected");
      delete sPlanes[username];
      io.sockets["in"](socket.room).emit("remove plane",  username);
    });
  });
  socket.on("try move plane", function(name, info){
    switch(info.axis){
      case "x":
        // this.speedx -= dir * this.acceleration;
        // if(Math.abs(this.dae.rotation.z) <= Math.PI/4){
        //   this.dae.rotation.z += dir * 0.05;
        // }
        sPlanes[name].speedx -= info.dir*sPlanes[name].acc;
        break;
      case "y":
        // this.speedy += dir * this.acceleration;
        // if(Math.abs(this.dae.rotation.x - Math.PI) <= Math.PI/5 ){
        //   this.dae.rotation.x += dir * 0.05;
        // }
        sPlanes[name].speedy += info.dir*sPlanes[name].acc;
      break;
      case "z":
        //this.speedz -= dir * this.acceleration;
        sPlanes[name].speedz -= info.dir*sPlanes[name].acc;
        break;
    }
    io.sockets["in"](socket.room).emit("move plane", name, {x:sPlanes[name].x,y:sPlanes[name].y,z:sPlanes[name].z});
  });
  socket.on("try rotate plane", function(name, info){

  });
  socket.on("try stop plane", function(name){
    sPlanes[name].speedx = 0;
    sPlanes[name].speedy = 0;
    sPlanes[name].speedz = 0;
  });
});
function tracker(){
  setInterval(function(){
    for(var i in sPlanes){
      sPlanes[i].x += sPlanes[i].speedx;
      sPlanes[i].y += sPlanes[i].speedy;
      sPlanes[i].z += sPlanes[i].speedz;
    }
  }, 1000/60);
}
