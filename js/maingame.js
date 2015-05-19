var scene, renderer, camera;

function MainGame(nickname){
  this.nickname = nickname;
  init();
}

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xadd8e6);
  $("#main_container").append(renderer.domElement);
  load();
  render();
}

function render(){
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function load(){
  // var manager = new THREE.LoadingManager();
  // manager.onProgress = function ( item, loaded, total ) {
	// 	console.log( item, loaded, total );
	// };
  // var onProgress = function ( xhr ) {
	// 	if ( xhr.lengthComputable ) {
	// 		var percentComplete = xhr.loaded / xhr.total * 100;
	// 		console.log(Math.round(percentComplete, 2) + '% downloaded');
	// 	}
	// };
	// var onError = function ( xhr ) {
	//    console.log("ERROR AGAIN?");
  // };
  // var texture = new THREE.Texture();
  // var loader = new THREE.ImageLoader(manager);
  // loader.load('models/F-35_Lightning/F-35_Lightning_II_P01.png' , function(image){
  //   texture.image = image;
  //   texture.needsUpdate = true;
  // }, onProgress, onError);
  //
  // var loader = new THREE.OBJLoader( manager );
	// 	loader.load('models/F-35_Lightning/F-35_Lightning_II.obj',function(object){
	// 		object.traverse(function (child){
	// 			if (child instanceof THREE.Mesh){
	// 				child.material.map = texture;
	// 			}
	// 		});
	// 		object.position.y = - 80;
	// 		scene.add( object );
	// }, onProgress, onError );
  //FIXME Victor's job
}
