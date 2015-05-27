function Plane(x, y, z, model, rotation, acceleration, name){
  this.x = x;
  this.y = y;
  this.z = z;
  this.rotation = rotation;
  var loader = new THREE.ColladaLoader();
  var dae;
  var self = this;
  this.camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, 0.1,1000);
  loader.load("models/"+model+"/model.dae", function(collada){
    dae = collada.scene;
    dae.scale.x=dae.scale.y=dae.scale.z=1;
    dae.rotation.x=Math.PI;
    dae.position.x = x;
    dae.position.y = y;
    dae.position.z = z;
    dae.updateMatrix();
    scene.add(dae);
    self.camera.position.z = z + 15;
    self.camera.position.y = y + 10;
    self.camera.position.x = x;
    self.camera.lookAt(new THREE.Vector3(x,y,z));
    socket.emit('send planes', name, dae);
  });
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xadd8e6);
  $("#main_container").append(renderer.domElement);
  this.renderer = renderer;
  this.render();
}

Plane.prototype.render = function(){
  requestAnimationFrame(this.render.bind(this));
  this.renderer.render(scene, this.camera);
}


Plane.prototype.move = function(){
  socket.emit('move plane', "1");
}

Plane.prototype.animate = function(){
//   var self = this;
// requestAnimationFrame(function render(){
//     self.animate();
//     requestAnimationFrame(render);
// });
  //dae.translateZ(dae.position.z + 1);
}
