function Bullet(x,y,z){
  var cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshNormalMaterial());
  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z-5;
  this.bullet = cube;
  this.originz = z;
  scene.add(cube);
  this.i = 0;
  this.move();
}

Bullet.prototype.move =function(){
  //console.log(this.bullet);
  var bindThis = this;
  setTimeout(function(){
    bindThis.bullet.position.z -= 0.75;
    var start = requestAnimationFrame(bindThis.move.bind(bindThis));
    bindThis.i++;
    if(bindThis.i > 100){
      cancelAnimationFrame(start);
      scene.remove(bindThis.bullet);
    }
  }, 1000/30);

}

