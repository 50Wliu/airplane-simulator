"use strict";
var canvas;
var context;
var menu;
$(window).ready(function()
{
	$('[data-toggle="tooltip"]').tooltip();  //Enable Bootstrap tooltips

	$("#form").submit(function(event)
	{
		event.preventDefault();  //Prevent form submissions from refreshing the page
	});

	$("<canvas/>").attr(
	{
		id: "canvas", width: $(window).innerWidth()+"px", height: $(window).innerHeight()+"px"
	}).appendTo("body");

  $("#hud").css(
  {
    display: "none", width: $(window).innerWidth()+"px", height: $(window).innerHeight()/9+"px"
  });

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	drawBackgroundAirplanes();
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

  $("#hud").css(
  {
    width: $(window).innerWidth()+"px", height: $(window).innerHeight()/9+"px"
  });
});