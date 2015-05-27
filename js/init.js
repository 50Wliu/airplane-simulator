"use strict";
var canvas;
var context;
var menu;
$(document).ready(function()
{
	$('[data-toggle="tooltip"]').tooltip();  //Enable Bootstrap tooltips
	$("#form").submit(function(event)
	{
		event.preventDefault();  //Prevent forum submissions from refreshing the page
	});

	$("<canvas/>").attr(
	{
		id: "main_canvas", width:$(document).innerWidth()+"px", height: $(document).innerHeight()+"px"
	}).css(
	{
		background: "#add8e6"
	}).appendTo("body");

	canvas = document.getElementById("main_canvas");
	context = canvas.getContext("2d");
	menu = new Menu();
	//Making Menu a seperate class just incase we want to add more to it
	//startMainGame("temp");
});

function startMainGame(nickname){
	menu.remove();
	$(document.getElementById("overlays")).remove();
	$(document.getElementById("main_canvas")).remove();
	init(nickname);
}
