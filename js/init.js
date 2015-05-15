"use strict";
var canvas;
var context;
var mainMenu;
var lobby
$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	$("#form").submit(function(e){
		e.preventDefault();
	});
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
	mainMenu = new Menu();
}

function StartLobbyMenu(nickname){
	var backend = new Backend();
	mainMenu.eraseSelf("overlays");
	lobby = new Lobby(nickname, backend);
}
