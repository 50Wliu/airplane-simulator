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


        $.getJSON("json/menu.json", function (data) {
	        $("body").append(buildHtml(data));
        });
	/*
	var menu = buildHtml($.getJSON("json/menu.json"));
	$("body").append(menu);
	//GameLoopManager.run(function(){MainMenu.Tick();});

	//document.addEventListener("mousedown", function(e){MainMenu.mouseDown(e);}, false);
	*/
}
