"use strict";
var Menu = function()
{
	var floatingManager = new FloatingObjectManager();
	floatingManager.createObject("images/menu_airplane.png", 4);
	floatingManager.move();
};

Menu.prototype.eraseSelf = function(id){
	$(document.getElementById(id)).remove();
}
