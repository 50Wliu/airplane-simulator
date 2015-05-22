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
	menu = new Menu();
	//Making Menu a seperate class just incase we want to add more to it
});

$(window).resize(function()
{
  $("canvas").attr(
  {
    width: $(window).innerWidth()+"px", height: $(window).innerHeight()+"px"
  });
});