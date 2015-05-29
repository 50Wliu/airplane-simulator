"use strict";

var scene, renderer;
function startGame(nickname)
{
	floatingManager.stop();
	$("#overlays").remove();
	$("#canvas").remove();
	$("#hud").show();

  scene = new THREE.Scene();
  var cube = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshNormalMaterial());
	scene.add(cube);

  var light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  loadPlane("F-35_Lightning", nickname);
}

function loadPlane(model, name)
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
    plane = new Plane(0, 10, 20, dae, 4 /*rotation not used right now*/, 0.05, name);
    plane.draw();
    plane.render();
  });
}