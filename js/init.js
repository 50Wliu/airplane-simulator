"use strict";
var canvas, context, floatingManager;
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

  $(".hud").css(
  {
    width: $("#hud").innerWidth()/10+"px", height: $("#hud").innerHeight()+"px"
  });

  var width = $("#hud").innerWidth()/10;
  for(var element=0; element<=9; element++)
  {
    $(".hud."+element).css(
    {
      left: width*element, 'background-color': function()
      {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ )
        {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    });
  }

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	//Background airplanes!
	floatingManager = new FloatingObjectManager();
	floatingManager.createObject("images/menu_airplane.png", 4);
	floatingManager.move();
});

$(window).resize(function()
{
	$("#hud").css(
	{
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()/9+"px"
	});

	$("canvas").attr(
	{
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()-document.getElementById("hud").clientHeight+"px"
	}).css(  //Only needed because three.js forces CSS onto the canvas element which overrides the above values
	{
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()-document.getElementById("hud").clientHeight+"px"
	});
});