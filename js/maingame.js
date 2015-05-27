var scene, renderer, socket;
planes = {};
function init(nickname){
  scene = new THREE.Scene();
  cube = new THREE.Mesh(new THREE.BoxGeometry(10,10,10),new THREE.MeshNormalMaterial());
	scene.add(cube);
  socket = io();
  socket.on('connect', function(){
    socket.emit('adduser', nickname);
  });
  socket.on('alertConnect', function(username, x, y, z, model){
    var plane = new Plane(x,y,z,model, 4 /*rotation not used right now*/, 0.2,nickname);
  });
  socket.on('get planes', function(splanes){
    planes = splanes;
  });
  load();
}


function load(){
  var light = new THREE.AmbientLight(0xffffff,1);
  scene.add(light);
}
