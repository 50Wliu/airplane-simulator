"use strict";
var canvas;
var context;
var menu;
$(document).ready(function()
{
	$('[data-toggle="tooltip"]').tooltip();  //Enable Bootstrap tooltips

	$("#form").submit(function(event)
	{
		event.preventDefault();  //Prevent form submissions from refreshing the page
	});

	$("<canvas/>").attr(
	{
		id: "canvas", width: $(document).innerWidth()+"px", height: $(document).innerHeight()+"px"
	}).appendTo("body");

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	drawBackgroundAirplanes();
	startGame("temp");
});

$(window).resize(function()
{
	$("canvas").attr(
	{
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()+"px"
	}).css(  //Only needed because three.js forces CSS onto the canvas element which overrides the above values
	{
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()+"px"
	});
});
