"use strict";
function Menu(){
	var floatingManager = new FloatingObjectManager();
	floatingManager.createObject("images/menu_airplane.png", 4);
	floatingManager.move();
	this.floatingManager = floatingManager;
}
Menu.prototype.remove = function(){
	this.floatingManager.stop();
	context.clearRect(0,0,canvas.width, canvas.height);
}
