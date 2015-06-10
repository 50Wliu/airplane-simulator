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
  this.name = name;
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
    if(e.keyCode == 32){
      bindThis.shoot();
    }
  });
  document.addEventListener("keyup", function(e){
    bindThis.setSpeed(0,0,0);
    bindThis.setRotation(Math.PI,0,0);
  });
}

Plane.prototype.draw = function(){
  scene.add(this.dae);
}
var temp = 10;
Plane.prototype.render = function(){
  var bindThis = this;
  var x,y,z;

  setTimeout(function(){
    z = bindThis.dae.position.z;
    x = bindThis.dae.position.x;
    y = bindThis.dae.position.y;
    requestAnimationFrame(bindThis.render.bind(bindThis));
    renderer.render(scene, bindThis.camera);
    bindThis.dae.position.x-=bindThis.speedx;
    bindThis.dae.position.y+=bindThis.speedy;
    bindThis.dae.position.z+=bindThis.speedz;
    bindThis.x = bindThis.dae.position.x;
    bindThis.y = bindThis.dae.position.y;
    bindThis.z = bindThis.dae.position.z;
    bindThis.camera.position.z = z + 20;
    bindThis.camera.position.y = y + 10;
    bindThis.camera.position.x = x;
    bindThis.camera.lookAt(new THREE.Vector3(x,y+4,z));
    graphManager.drawOnGraph("position", temp, bindThis.z);
    graphManager.drawOnGraph("velocity", temp, bindThis.speedz*10);
    graphManager.drawOnGraph("acceleration", temp, bindThis.speedz > 0 ? 1 * 10 : !bindThis.speedz ? 0 : -1 * 10);
    temp++;
  }, 1000/60);
}

Plane.prototype.move = function(axis, dir){
  switch(axis){
    case "x":
      this.speedx -= dir * this.acceleration;
      if(Math.abs(this.dae.rotation.z) <= Math.PI/4){
        this.dae.rotation.z += dir * 0.05;
      }
      break;
    case "y":
      this.speedy += dir * this.acceleration;
      if(Math.abs(this.dae.rotation.x - Math.PI) <= Math.PI/5 ){
        this.dae.rotation.x += dir * 0.05;
      }
    break;
    case "z":
      this.speedz -= dir * this.acceleration;
      break;
  }
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
