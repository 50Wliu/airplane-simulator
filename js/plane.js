//VERY BUGGED DON"T TOUCH
function Plane(x, y, z, dae, rotation, acceleration, name){
  this.x = x;
  this.y = y;
  this.z = z;
  this.rotation = rotation;
  this.acceleration = acceleration;
  //One acceleation for now till andrew uses CAS
  this.speedx = 0;
  this.speedy = 0;
  this.speedz = 0;
  this.dae = dae;
  this.dae.position.x = this.x;
  this.dae.position.y = this.y;
  this.dae.position.z = this.z;
  this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  this.camera.rotation.y = Math.PI;
  this.camera.rotation.z = Math.PI;
  this.camera.rotation.x = -Math.PI/10;
  this.camera.position.set(0,-10,-15);
  //this.camera.lookAt(new THREE.Vector3(0,0,0));
  this.dae.add(this.camera);

  this.name = name;
  var bindThis = this;
  $("body").append(renderer.domElement);
}

Plane.prototype.draw = function(){
  scene.add(this.dae);
}
var temp = 10;
Plane.prototype.graphDraw = function(){
  if(temp < context.canvas.width - 10 - 10){
    temp++;
  }
  graphManager.drawOnGraph("position", temp, this.z);
  graphManager.drawOnGraph("velocity", temp, this.speedz*10);
  graphManager.drawOnGraph("acceleration", temp, this.speedz > 0 ? 1 * 10 : !this.speedz ? 0 : -1 * 10);
}

Plane.prototype.render = function(){
  var bindThis = this;
  var x,y,z;
  setTimeout(function(){
    z = bindThis.dae.position.z;
    x = bindThis.dae.position.x;
    y = bindThis.dae.position.y;
    bindThis.dae.position.x-=bindThis.speedx;
    bindThis.dae.position.y+=bindThis.speedy;
    bindThis.dae.position.z+=bindThis.speedz;
    bindThis.x = bindThis.dae.position.x;
    bindThis.y = bindThis.dae.position.y;
    bindThis.z = bindThis.dae.position.z;
    // bindThis.camera.position.z = z+20;
    // bindThis.camera.position.y = y+10;
    // bindThis.camera.position.x = x;
    // bindThis.camera.position.z = z + 20*Math.sin(bindThis.dae.rotation.z)*Math.cos(bindThis.dae.rotation.y);
    // bindThis.camera.position.y = y + 10*Math.cos(bindThis.dae.rotation.z);
    // bindThis.camera.position.x = x + Math.sin(bindThis.dae.rotation.z)*Math.sin(bindThis.dae.rotation.y);
    // console.log(20*Math.sin(bindThis.dae.rotation.z)*Math.cos(bindThis.dae.rotation.y));
    //bindThis.camera.lookAt(new THREE.Vector3(x,y+4,z));
    requestAnimationFrame(bindThis.render.bind(bindThis));
  }, 1000/60);
}

Plane.prototype.move = function(axis, dir){
  var accZ = Math.cos(this.dae.rotation.y)*this.acceleration;
  var accX = Math.sin(this.dae.rotation.y)*this.acceleration;
  this.speedx -= accX;
  this.speedz -= accZ;
}

Plane.prototype.shoot = function(){
  var bullet = new Bullet(this.x,this.y,this.z);
}

Plane.prototype.setSpeed = function(val1,val2,val3){
  this.speedx = val1;
  this.speedy = val2;
  this.speedz = val3;
}

Plane.prototype.setRotation = function(val1,val2,val3){
  this.dae.rotation.x = val1;
  this.dae.rotation.y = val2;
  this.dae.rotation.z = val3;
}
