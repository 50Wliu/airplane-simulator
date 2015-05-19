"use strict";
var canvas;
var context;

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
	}).appendTo("#main_container");

	canvas = document.getElementById("main_canvas");
	context = canvas.getContext("2d");

	var floatingManager = new FloatingObjectManager();
	floatingManager.createObject("images/menu_airplane.png", 4);
	floatingManager.move();
});