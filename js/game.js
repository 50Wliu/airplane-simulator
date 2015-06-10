<<<<<<< HEAD
"use strict";

var scene, renderer, graphManager;
var cPlanes = {};
var nickname;
function startGame(name)
{
	nickname = name;
	floatingManager.stop();
	$("#overlays").remove();
	$("#canvas").remove();
	$("#hud").show();

	renderer = new THREE.WebGLRenderer();
	renderer.domElement.setAttribute("id", "game");
	renderer.setSize(window.innerWidth, window.innerHeight-$("#hud").innerHeight());
	renderer.setClearColor(0xadd8e6);

	scene = new THREE.Scene();
	var cube = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshNormalMaterial());
	scene.add(cube);

	var light = new THREE.AmbientLight(0xffffff, 1);
	scene.add(light);
	window.backend.startGame(nickname);

	graphManager = new GraphManager("graph-overlay");
	graphManager.addGraph("position");
	graphManager.addGraph("velocity");
	graphManager.addGraph("acceleration");

	//loadPlane("F-35_Lightning", nickname, 0,10,20);
}

function render(){
	//console.log(cPlanes[nickname].dae);
	renderer.render(scene, cPlanes[nickname].camera);
	requestAnimationFrame(render);
}

function loadPlane(model, nickname, posX, posY, posZ)
{
	var dae;
	var loader = new THREE.ColladaLoader();
	var plane;
	loader.load("models/"+model+"/model.dae", function(collada)
	{
		dae = collada.scene;
		dae.scale.x=dae.scale.y=dae.scale.z=1;
		dae.rotation.x=Math.PI;
		dae.updateMatrix();
		plane = new Plane(posX, posY, posZ, dae, 4 /*rotation not used right now*/, 0.05, nickname);
		if(cPlanes[nickname] == undefined){
			cPlanes[nickname] = plane;
			cPlanes[nickname].draw();
			cPlanes[nickname].render();
		}
		render();
  });
}
=======
"use strict";

var scene, renderer, graphManager;
function startGame(nickname)
{
	floatingManager.stop();
	$("#overlays").remove();
	$("#canvas").remove();
	$("#hud").show();

	renderer = new THREE.WebGLRenderer();
	renderer.domElement.setAttribute("id", "game");
	renderer.setSize(window.innerWidth, window.innerHeight-$("#hud").innerHeight());
	renderer.setClearColor(0xadd8e6);

	scene = new THREE.Scene();
	var cube = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshNormalMaterial());
	scene.add(cube);

	var light = new THREE.AmbientLight(0xffffff, 1);
	scene.add(light);

	graphManager = new GraphManager("graph-overlay");
	graphManager.addGraph("position");
	graphManager.addGraph("velocity");
	graphManager.addGraph("acceleration");
	window.backend.startGame(nickname);
	//loadPlane("F-35_Lightning", nickname);
}

function loadPlane(model, nickname, posX, posY, posZ)
{
	var dae;
	var loader = new THREE.ColladaLoader();
	var plane;
	loader.load("models/"+model+"/model.dae", function(collada)
	{
		dae = collada.scene;
		dae.scale.x=dae.scale.y=dae.scale.z=1;
		dae.rotation.x=Math.PI;
		dae.updateMatrix();
		plane = new Plane(posX, posY, posZ, dae, 4 /*rotation not used right now*/, 0.05, nickname);
		plane.draw();
		plane.render();
  });
}
>>>>>>> 7d843b8ef39ce84e23bcb20dc99ce44ada3b85ee
