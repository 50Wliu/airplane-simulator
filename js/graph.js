function Graph(graphName, context, canvas, x, y){
  this.x = x;
  this.y = y;
  this.vart = x;
  this.vary = y+50;
  this.context = context;
  this.graphName = graphName;
  this.canvas = canvas;
  context.beginPath();
  context.setLineDash([1,0]);
  context.rect(x, y, canvas.width - 20, 100);
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  context.stroke();
  context.setLineDash([2]);
  context.moveTo(10, y + 50);
  context.lineTo(canvas.width - 10, y + 50);
  context.stroke();
  context.font = "24px serif";
  context.fillText(graphName, 10, y + 115+5);
}

Graph.prototype.drawDot = function(nt, ny){
  var context = this.context;
  var imageData = context.getImageData(this.x+1, this.y, this.canvas.width-20, 49);
  var imageData2 = context.getImageData(this.x+1, this.y + 51, this.canvas.width-20, 49);
  context.putImageData(imageData, this.x, this.y);
  context.putImageData(imageData2, this.x, this.y+51);
  context.clearRect(context.canvas.width-20, this.y, 1, 100);
  context.fillRect(this.vart + 50, this.vary+ny, 1,1);
  context.stroke();
}
