"use strict";

var floatingManager;
function drawBackgroundAirplanes()
{
	floatingManager = new FloatingObjectManager();
	floatingManager.createObject("images/menu_airplane.png", 4);
	floatingManager.move();
}