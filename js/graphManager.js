"use strict";
function GraphManager(canvasOverlay){
  $("#" + canvasOverlay).show();
  this.canvasOverlay = document.getElementById(canvasOverlay);
  this.canvas = document.getElementById(canvasOverlay.substr(0, canvasOverlay.search('-')));
  $("#" + canvasOverlay.substr(0, canvasOverlay.search('-'))).show();
  this.canvas.width = 300;
  this.canvas.height = $(document).height();
  this.context = this.canvas.getContext("2d");
  this.graphs = {};
}

GraphManager.prototype.addGraph = function(name){
  var graph = new Graph(name, this.context, this.canvas, this.canvasOverlay, 10, Object.keys(this.graphs).length * 140 + 10);
  for(var i in this.graphs){
    if(this.graphs[i] === graph){
      return;
    } else {
      this.graphs[name] = graph;
      return;
    }
  }
  this.graphs[name] = graph;
};

GraphManager.prototype.drawOnGraph = function(graphName, x, y){
  this.graphs[graphName].drawDot(x,y);
};