var canvas;
var context;
var scene;
$(document).ready(function(){
  $("<canvas/>" ).attr({
    id: "main_canvas",width:$(document).innerWidth()+"px",height: $(document).innerHeight()+"px"
  }).css({
    background: "#7ec0ee"
  }).appendTo("#main_container");
  canvas = document.getElementById("main_canvas");
  context = canvas.getContext("2d");
  StartMainMenu();
});

function StartMainMenu(){
  //Creating a new Menu Object
  var MainMenu = new Menu("The Battle of Calculus Planes",
  [ "Play", "Settings"],
  200, 50, 200,
  function(numItem) { if (numItem == 0) StartGame(); });
  GameLoopManager.run(function(elapsed) { MainMenu.Tick(elapsed);});
  document.addEventListener("mousedown", function(e){MainMenu.mouseDown(e)}, false);
}
