"use strict";

var scene, renderer, socket;
var cPlanes = {};
var nickname;
function startGame(name)
{
	nickname = name;
	renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xadd8e6);

	floatingManager.stop();
	$("#overlays").remove();
	$("#canvas").remove();
	$("#hud").show();

	socket = io();
	socket.emit("join", nickname);
	socket.on("load plane", function(planes){
		for(var i in planes){
			loadPlane("F-35_Lightning", i, planes[i].x, planes[i].y, planes[i].z);
		}
	});
	socket.on("remove plane", function(name){
		cPlanes[name].remove();
	});
	socket.on("move plane", function(name, info){
		cPlanes[name].dae.position.x = info.x;
		cPlanes[name].dae.position.y = info.y;
		cPlanes[name].dae.position.z = info.z;
		cPlanes[name].camera.position.x = info.x;
		cPlanes[name].camera.position.y = info.y + 10;
		cPlanes[name].camera.position.z = info.z + 20;
	});
	socket.on("rotate plane", function(name, info){
		cPlanes[name].dae.rotation.y += info.dir*0.02;
		//cPlanes[name].camera.rotation.y -= info.dir*0.02;
	});
	scene = new THREE.Scene();
	var cube = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshNormalMaterial());
	scene.add(cube);

	var light = new THREE.AmbientLight(0xffffff, 1);
	scene.add(light);

	document.addEventListener("keydown", function(e){
    if(e.keyCode == 38){
    	socket.emit("try move plane", nickname, {axis:"z", dir:1});
		} else if(e.keyCode == 40){
			socket.emit("try move plane", nickname, {axis:"z", dir:-1});
    } else if(e.keyCode == 37){
			//socket.emit("try move plane", nickname, {axis:"x", dir:1});
			socket.emit("try rotate plane", nickname, {axis:"x", dir:-1});
    } else if(e.keyCode == 39){
			//socket.emit("try move plane", nickname, {axis:"x", dir:-1});
			socket.emit("try rotate plane", nickname, {axis:"x", dir:1});
    } else if(e.keyCode == 87){
			socket.emit("try move plane", nickname, {axis:"y", dir:1});
    } else if(e.keyCode == 83){
			socket.emit("try move plane", nickname, {axis:"y", dir:-1});
    }
    if(e.keyCode == 32){
      bindThis.shoot();
    }
  });
  document.addEventListener("keyup", function(e){
    //bindThis.setSpeed(0,0,0);
    //bindThis.setRotation(Math.PI,0,0);
		socket.emit("try stop plane", nickname);
  });

}

function render(camera){
	renderer.render(scene, cPlanes[nickname].camera);
	requestAnimationFrame(render);
}

function loadPlane(model, nickname, x, y, z)
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
		plane = new Plane(x, y, z, dae, 4 /*rotation not used right now*/, 0.05, name);
		if(cPlanes[nickname] == undefined){
			cPlanes[nickname] = plane;
			cPlanes[nickname].draw();
			cPlanes[nickname].render();
		}
		render(cPlanes[nickname].camera);
  });
}
