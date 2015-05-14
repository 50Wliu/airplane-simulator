"use strict";
var canvas;
var context;

$(document).ready(function(){
	$("<canvas/>").attr({
		id: "main_canvas", width:$(document).innerWidth()+"px", height: $(document).innerHeight()+"px"
	}).css({
		background: "#add8e6"
	}).appendTo("#main_container");
	canvas = document.getElementById("main_canvas");
	context = canvas.getContext("2d");
	StartMainMenu();
});

function StartMainMenu()
{
	//Creating a new Menu Object
	var MainMenu = new Menu("",
	[],
	200, 50, 200,
	function(numItem)
{
	if(numItem === 0)
	{
		StartGame();
	}
});


$.ajax({
	type: "POST",
	url: "json/welcome_menu.json",
	dataType: "script",
	async: false,
	contentType: "application/json; charset=utf-2",
	success: function(data){
		var menu = buildHtml(eval(data)); //Using eval() for a temparary fix
		$("body").append(menu);
	},
	error: function(data){
		console.log("Error loading JSON! WHAT THE HECK IS WRONG")
	}
});


//GameLoopManager.run(function(){MainMenu.Tick();});

//document.addEventListener("mousedown", function(e){MainMenu.mouseDown(e);}, false);
}
