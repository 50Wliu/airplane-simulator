function Bullet(x,y,z){
  var cube = new THREE.Mesh(new THREE.SphereGeometry(0.3),new THREE.MeshNormalMaterial());
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
    bindThis.bullet.position.z -= 2;
    var start = requestAnimationFrame(bindThis.move.bind(bindThis));
    bindThis.i++;
    if(bindThis.i > 75){
      cancelAnimationFrame(start);
      scene.remove(bindThis.bullet);
    }
  }, 0.5);

}
