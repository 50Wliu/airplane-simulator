planes = {};
//VERY BUGGED DON"T TOUCH
function Plane(x, y, z, model, rotation, acceleration, name){
  this.x = x;
  this.y = y;
  this.z = z;
  this.rotation = rotation;
  this.acceleration = acceleration;
  this.speed = 0;
  var loader = new THREE.ColladaLoader();
  var dae;
  this.test = null;
  var self = this;
  this.name = name;
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
    //self.setModel(dae).bind(self);
    planes[name] = dae;
    self.renderer = renderer;
    self.render();
  });
  console.log(this.test);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xadd8e6);
  $("body").append(renderer.domElement);
}

Plane.prototype.setModel = function(model){
  this.test = model;
}

Plane.prototype.render = function(){
  var bindThis = this;
  var x,y,z;
  setTimeout(function(){
    z = planes[bindThis.name].position.z;
    x = planes[bindThis.name].position.x;
    y = planes[bindThis.name].position.y;
    requestAnimationFrame(bindThis.render.bind(bindThis));
    bindThis.renderer.render(scene, bindThis.camera);
    bindThis.camera.position.z = z + 15;
    bindThis.camera.position.y = y + 5;
    bindThis.camera.position.x = x;
    bindThis.camera.lookAt(new THREE.Vector3(x,y,z));
    //planes[bindThis.name].position.z -= planes[bindThis.name].speed;
  }, 1000/30);
}


Plane.move = function(name, x, y, z){
  planes[name].speed += planes[name].acceleration;
}
