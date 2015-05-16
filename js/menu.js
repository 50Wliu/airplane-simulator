"use strict";
var Menu = function()
{
	var floatingManager = new FloatingObjectManager();
	floatingManager.createObject("images/menu_airplane.png", 4);
	floatingManager.move();
};

Menu.prototype.create = function(){
	$.getJSON("json/welcome_menu.json", function (data) {
		console.log(data);
		$("body").append(buildHtml(data));
	}).fail(function(){
		console.log("error: what the heck went wrong? Ugh now I have to go back and debug it :(");
	});
}

Menu.prototype.remove = function(id)
{
	$(document.getElementById(id)).remove();
};
