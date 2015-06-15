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
	var loader1 = new THREE.ColladaLoader();
	for(var i = 0; i < 2; i++){
		for(var j = 0; j < 2; j ++){
			for(var k = 0; k < 2; k++){
				// var cube = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshNormalMaterial());
				// cube.position.x = i * 30;
				// cube.position.y = j * 30;
				// cube.position.z = k * 30;
				// scene.add(cube);

				loader1.load("models/cloud.dae", function(collada)
				{
					var dae = collada.scene;
					dae.scale.x=dae.scale.y=dae.scale.z=1;
					dae.updateMatrix();
					dae.position.x = Math.random()*50;
					dae.position.y = Math.random()*50;
					dae.position.z = Math.random()*50;
					scene.add(dae);
				});
			}
		}
	}


	debugaxis(100);
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
		} else if(e.keyCode == 65){
			//cPlanes[window.backend.id].move("x", -1);
			cPlanes[window.backend.id].setRotation(cPlanes[window.backend.id].dae.rotation.x,cPlanes[window.backend.id].dae.rotation.y-Math.PI/32,0);
		} else if(e.keyCode == 68){
			//cPlanes[window.backend.id].move("x", 1);
			cPlanes[window.backend.id].setRotation(cPlanes[window.backend.id].dae.rotation.x,cPlanes[window.backend.id].dae.rotation.y+Math.PI/32,0);
		} else if(e.keyCode == 87){
			cPlanes[window.backend.id].setRotation(cPlanes[window.backend.id].dae.rotation.x+Math.PI/32,cPlanes[window.backend.id].dae.rotation.y,cPlanes[window.backend.id].dae.rotation.z);
		} else if(e.keyCode == 83){
			cPlanes[window.backend.id].setRotation(cPlanes[window.backend.id].dae.rotation.x-Math.PI/32,cPlanes[window.backend.id].dae.rotation.y,cPlanes[window.backend.id].dae.rotation.z);
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
			//dae.visible = false;
		}
		plane = new Plane(posX, posY, posZ, dae, 4 /*rotation not used right now*/, 0.05, nickname);
		if(cPlanes[uuid] == undefined){
			cPlanes[uuid] = plane;
			cPlanes[uuid].draw();
			cPlanes[uuid].render();
		}
  });
}

var debugaxis = function(axisLength){
    //Shorten the vertex function
    function v(x,y,z){
            return new THREE.Vector3(x,y,z);
    }

    //Create axis (point1, point2, colour)
    function createAxis(p1, p2, color){
            var line, lineGeometry = new THREE.Geometry(),
            lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 1});
            lineGeometry.vertices.push(p1, p2);
            line = new THREE.Line(lineGeometry, lineMat);
            scene.add(line);
    }

    createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
    createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
    createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
};
