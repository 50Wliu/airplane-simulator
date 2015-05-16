"use strict";
var canvas;
var context;
var mainMenu;
var lobby;

$(document).ready(function(){
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
	StartMainMenu();
});

function StartMainMenu()
{
	mainMenu = new Menu();
	mainMenu.create();
}

function StartLobbyMenu(nickname)
{
	var backend = new Backend();
	// mainMenu.remove("overlays");
	// lobby = new Lobby(nickname, backend);
	alert("Temp interface for room selection");
}
