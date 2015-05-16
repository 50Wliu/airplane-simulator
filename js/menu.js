"use strict";
var Menu = function()
{
	var floatingManager = new FloatingObjectManager();
	floatingManager.createObject("images/menu_airplane.png", 4);
	floatingManager.move();
};

Menu.prototype.remove = function(id)
{
	$(document.getElementById(id)).remove();
};