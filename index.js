var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var usernames = {};

var rooms = ["FFA"];

var splanes = {};
app.use(express.static(__dirname + '/public'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.sockets.on('connection', function(socket) {
  socket.on('adduser', function(username) {
    socket.username = username;
    socket.room = 'FFA';
    usernames[username] = username;
    socket.join('FFA');
    io.sockets["in"](socket.room).emit('alertConnect',username,Math.random()*20,Math.random()*20,Math.random()*20,"F-35_Lightning");
    //socket.emit('updaterooms', rooms, 'Lobby');
    console.log("user " + username + " has connected!");
    socket.on('disconnect', function(){
      console.log("user " + username + " has disconnected");
    });
  });

  socket.on('send planes', function(name, plane){
    console.log("------------------");
    splanes[name] = plane;
    io.sockets["in"](socket.room).emit('get planes', splanes);
  });

  socket.on('move plane', function(name) {
    splanes[name].positon.x += 1;
  });

  socket.on('create', function(room) {
      rooms.push(room);
      socket.emit('updaterooms', rooms, socket.room);
  });

  socket.on('switchRoom', function(newroom) {
    var oldroom;
    oldroom = socket.room;
    socket.leave(socket.room);
    socket.join(newroom);
    socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
    socket.broadcast.to(oldroom).emit('updatechat', 'SERVER', socket.username + ' has left this room');
    socket.room = newroom;
    socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
    socket.emit('updaterooms', rooms, newroom);
  });

  socket.on('disconnect', function() {
    delete usernames[socket.username];
    io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    socket.leave(socket.room);
  });
});
