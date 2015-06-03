function Graph(graphName, context, canvas, x, y){
  this.x = x;
  this.t = y+50;
  this.context = context;
  this.graphName = graphName;
  this.canvas = canvas;
  context.beginPath();
  context.setLineDash([1,0]);
  context.rect(x, y, canvas.width - 20, 100);
  context.lineWidth = 1.5;
  context.strokeStyle = 'black';
  context.stroke();
  context.setLineDash([2]);
  context.moveTo(10, y + 50);
  context.lineTo(canvas.width - 10, y + 50);
  context.stroke();
  context.font = "24px serif";
  context.fillText(graphName, 10, y + 115+5);
}

Graph.prototype.drawDot = function(nx, nt){
  var context = this.context;
  context.fillRect(this.x + nx, this.t+nt, 1,1);
  context.stroke();
}
