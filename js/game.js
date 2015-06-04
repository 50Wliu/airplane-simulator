"use strict";

var scene, renderer, graphManager;
function startGame(nickname)
{
	floatingManager.stop();
	$("#overlays").remove();
	$("#canvas").remove();
	$("#hud").show();

	renderer = new THREE.WebGLRenderer();
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

	loadPlane("F-35_Lightning", nickname);
}

function loadPlane(model, nickname)
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
		plane = new Plane(0, 10, 20, dae, 4 /*rotation not used right now*/, 0.05, nickname);
		plane.draw();
		plane.render();
  });
}
