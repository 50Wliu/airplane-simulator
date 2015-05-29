function Bullet(x,y,z){
  var cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshNormalMaterial());
  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z-5;
  this.bullet = cube;
  this.originz = z;
  scene.add(cube);
  this.move();
}

Bullet.prototype.move =function(){
  //console.log(this.bullet);
  var bindThis = this;
  setTimeout(function(){
    bindThis.bullet.position.z -= 0.5;
    var start = requestAnimationFrame(bindThis.move.bind(bindThis));
    // if(bindThis.bullet.position.z > bindThis.originz+10){
    //   cancelAnimationFrame(start);
    //   scene.remove(start)
    // }
  }, 1000/30);

}
