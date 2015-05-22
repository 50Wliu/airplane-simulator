"use strict";
function Menu()  //TODO: Move the FloatingObject stuff to a different function/file
{
	var floatingManager = new FloatingObjectManager();
	floatingManager.createObject("images/menu_airplane.png", 4);
	floatingManager.move();
	this.floatingManager = floatingManager;
}

Menu.prototype.remove = function()
{
	this.floatingManager.stop();
	context.clearRect(0, 0, canvas.width, canvas.height);
};

function startGame(nickname)  //TODO: Refactor this so that it doesn't rely on init.js's 'menu' variable
{
	menu.remove();
	$(document.getElementById("overlays")).remove();
	$(document.getElementById("canvas")).remove();
	var game = new MainGame(nickname);
}