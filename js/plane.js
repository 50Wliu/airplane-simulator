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
  this.name = name;
  this.camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight, 0.1,1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xadd8e6);
  this.renderer = renderer;
  var bindThis = this;
  $("body").append(renderer.domElement);
  document.addEventListener("keydown", function(e){
    if(e.keyCode == 38){
      bindThis.move("z", 1);
    } else if(e.keyCode == 40){
      bindThis.move("z", -1);
    } else if(e.keyCode == 37){
      bindThis.move("x", -1);
    } else if(e.keyCode == 39){
      bindThis.move("x", 1);
    } else if(e.keyCode == 87){
      bindThis.move("y", 1);
    } else if(e.keyCode == 83){
      bindThis.move("y", -1);
    }
  });
  document.addEventListener("keyup", function(e){
    bindThis.setSpeed(0,0,0);
  });
}

Plane.prototype.draw = function(){
  scene.add(this.dae);
}

Plane.prototype.render = function(){
  var bindThis = this;
  var x,y,z;
  setTimeout(function(){
    z = bindThis.dae.position.z;
    x = bindThis.dae.position.x;
    y = bindThis.dae.position.y;
    requestAnimationFrame(bindThis.render.bind(bindThis));
    bindThis.renderer.render(scene, bindThis.camera);
    bindThis.dae.position.x-=bindThis.speedx;
    bindThis.dae.position.y+=bindThis.speedy;
    bindThis.dae.position.z+=bindThis.speedz;
    bindThis.camera.position.z = z + 15;
    bindThis.camera.position.y = y + 5;
    bindThis.camera.position.x = x;
    bindThis.camera.lookAt(new THREE.Vector3(x,y,z));
  }, 1000/30);
}

Plane.prototype.move = function(axis, dir){
  switch(axis){
    case "x":
      this.speedx -= dir * this.acceleration;
      break;
    case "y":
      this.speedy += dir * this.acceleration;
    break;
    case "z":
      this.speedz -= dir * this.acceleration;
      break;
  }
}

Plane.prototype.setSpeed = function(val1,val2,val3){
  this.speedx = val1;
  this.speedy = val2;
  this.speedz = val3;
}
