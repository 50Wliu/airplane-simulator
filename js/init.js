<<<<<<< HEAD
"use strict";
window.backend = new Backend(window.Frontend);
var canvas, context, floatingManager;
$(window).ready(function()
{
	$('[data-toggle="tooltip"]').tooltip();  //Enable Bootstrap tooltips

	$("<canvas/>").attr(
	{
		id: "canvas", width: $(window).innerWidth()+"px", height: $(window).innerHeight()+"px"
	}).appendTo("body");

	$("#hud").css(
	{
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()/9+"px"
	});

	var width = $("#hud").innerWidth()/10;
	for(var element=0; element<=9; element++)
	{
		$(".hud."+element).attr(
		{
			onclick: "$('.hud.'+" + element + ").css({'background-color': GetRandomColor()}); graphManager.addGraph('HII');"
		}).css(
		{
			left: width*element, 'background-color': GetRandomColor(), width: $("#hud").innerWidth()/10-10+"px", height: $("#hud").innerHeight()-10+"px"
		});
	}

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	//Background airplanes!
	floatingManager = new FloatingObjectManager();
	floatingManager.createObject("images/menu_airplane.png", 4);
	floatingManager.move();
	//startGame("t");
});

function GetRandomColor()  //Temporary until the HUD actually does something
{
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ )
	{
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

$(window).resize(function()  //TODO: Extract all of this out to resize.js
{
	$("#hud").css(
	{
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()/9+"px"
	});

  var width = $("#hud").innerWidth()/10;
	for(var element=0; element<=9; element++)
	{
		$(".hud."+element).css(
		{
			left: width*element, width: $("#hud").innerWidth()/10-10+"px", height: $("#hud").innerHeight()-10+"px"
		});
	}

	$("#canvas").attr(
	{
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()-document.getElementById("hud").clientHeight+"px"
	});

  $("#game").attr(
	{
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()-document.getElementById("hud").clientHeight+"px"
	}).css(  //Only needed because three.js forces CSS onto the canvas element which overrides the above values
	{
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()-document.getElementById("hud").clientHeight+"px"
	});

  $("#graph").attr(
  {
    height: $(window).innerHeight()-document.getElementById("hud").clientHeight+"px"
  });

  $("#graph-overlay").attr(
  {
    height: $(window).innerHeight()-document.getElementById("hud").clientHeight+"px"
  });
});
=======
"use strict";
window.backend = new Backend(window.Frontend);
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
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()/9+"px"
	});

	var width = $("#hud").innerWidth()/10;
	for(var element=0; element<=9; element++)
	{
		$(".hud."+element).attr(
		{
			onclick: "$('.hud.'+" + element + ").css({'background-color': GetRandomColor()}); graphManager.addGraph('HII');"
		}).css(
		{
			left: width*element, 'background-color': GetRandomColor(), width: $("#hud").innerWidth()/10-10+"px", height: $("#hud").innerHeight()-10+"px"
		});
	}

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	//Background airplanes!
	floatingManager = new FloatingObjectManager();
	floatingManager.createObject("images/menu_airplane.png", 4);
	floatingManager.move();
	//startGame("t");
});

function GetRandomColor()  //Temporary until the HUD actually does something
{
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ )
	{
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

$(window).resize(function()  //TODO: Extract all of this out to resize.js
{
	$("#hud").css(
	{
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()/9+"px"
	});

  var width = $("#hud").innerWidth()/10;
	for(var element=0; element<=9; element++)
	{
		$(".hud."+element).css(
		{
			left: width*element, width: $("#hud").innerWidth()/10-10+"px", height: $("#hud").innerHeight()-10+"px"
		});
	}

	$("#canvas").attr(
	{
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()-document.getElementById("hud").clientHeight+"px"
	});

  $("#game").attr(
	{
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()-document.getElementById("hud").clientHeight+"px"
	}).css(  //Only needed because three.js forces CSS onto the canvas element which overrides the above values
	{
		width: $(window).innerWidth()+"px", height: $(window).innerHeight()-document.getElementById("hud").clientHeight+"px"
	});

  $("#graph").attr(
  {
    height: $(window).innerHeight()-document.getElementById("hud").clientHeight+"px"
  });

  $("#graph-overlay").attr(
  {
    height: $(window).innerHeight()-document.getElementById("hud").clientHeight+"px"
  });
});
>>>>>>> 7d843b8ef39ce84e23bcb20dc99ce44ada3b85ee
