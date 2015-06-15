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
	for(var i = 0; i < 10; i++){
	    for(var j = 0; i < 10; i++){
	    	var cube = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshNormalMaterial());
	    	cube.position.x = i*11;
	    	cube.position.z = i*11;
		scene.add(cube);
	    }
	}
	

	var light = new THREE.AmbientLight(0xffffff, 1);
	scene.add(light);
	window.backend.joinGame(nickname);
	graphManager = new GraphManager("graph-overlay");
	graphManager.addGraph("position");
	graphManager.addGraph("velocity");
	graphManager.addGraph("acceleration");

	document.addEventListener("keydown", function(e){
		if(e.keyCode == 38){
			cPlanes[window.backend.id].move("z", 1);

		} else if(e.keyCode == 40){
			cPlanes[window.backend.id].move("z", -1);
		} else if(e.keyCode == 37){
			//cPlanes[window.backend.id].move("x", -1);
			cPlanes[window.backend.id].setRotation(Math.PI,cPlanes[window.backend.id].dae.rotation.y-Math.PI/32,0);
		} else if(e.keyCode == 39){
			//cPlanes[window.backend.id].move("x", 1);
			cPlanes[window.backend.id].setRotation(Math.PI,cPlanes[window.backend.id].dae.rotation.y+Math.PI/32,0);
		} else if(e.keyCode == 87){
			cPlanes[window.backend.id].move("y", 1);
		} else if(e.keyCode == 83){
			cPlanes[window.backend.id].move("y", -1);
		}
		if(e.keyCode == 32){
			cPlanes[window.backend.id].shoot();
		}
	});
	document.addEventListener("keyup", function(e){
		cPlanes[window.backend.id].setSpeed(0,0,0);
		//cPlanes[window.backend.id].setRotation(Math.PI,0,0);
	});


}

function render(){
	if(cPlanes[window.backend.id]){
		cPlanes[window.backend.id].graphDraw();
		renderer.render(scene, cPlanes[window.backend.id].camera);
	}
	requestAnimationFrame(render);
}

function loadPlane(uuid, nickname, model, posX, posY, posZ)
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
		if(uuid == window.backend.id){
			render();
			dae.visible = false;
		}
		plane = new Plane(posX, posY, posZ, dae, 4 /*rotation not used right now*/, 0.05, nickname);
		if(cPlanes[uuid] == undefined){
			cPlanes[uuid] = plane;
			cPlanes[uuid].draw();
			cPlanes[uuid].render();
		}
  });
}
