var scene, renderer;
function init(nickname){
  scene = new THREE.Scene();
  cube = new THREE.Mesh(new THREE.BoxGeometry(10,10,10),new THREE.MeshNormalMaterial());
  var plane = new Plane(0,10,20,"F-35_Lightning", 4 /*rotation not used right now*/, 0.2,nickname);
	scene.add(cube);
  load();
}

function load(){
  var light = new THREE.AmbientLight(0xffffff,1);
  scene.add(light);
}
