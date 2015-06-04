var socket = io();
socket.on('connect', function(){
  socket.emit('adduser', nickname);
});
socket.on('alertConnect', function(username){
  alert("Hello " + username + "! Welcome to the game!");
});
