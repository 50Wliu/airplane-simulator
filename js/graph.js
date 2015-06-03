function Graph(graphName, context, canvas, canvasOverlay, x, y){
  this.x = x;
  this.y = y;
  this.vart = x;
  this.vary = y + 50;
  this.context = context;
  var contextOverlay = canvasOverlay.getContext("2d");
  this.canvas = canvas;
  contextOverlay.beginPath();
  contextOverlay.setLineDash([1,0]);
  contextOverlay.rect(x, y, canvasOverlay.width - 20, 100);
  contextOverlay.lineWidth = 1;
  contextOverlay.strokeStyle = 'black';
  contextOverlay.stroke();
  contextOverlay.setLineDash([2]);
  contextOverlay.moveTo(10, y + 50);
  contextOverlay.lineTo(canvasOverlay.width - 10, y + 50);
  contextOverlay.stroke();
  contextOverlay.font = "24px serif";
  contextOverlay.fillText(graphName, 10, y + 115 + 5);
}

Graph.prototype.drawDot = function(nt, ny)
{
  var imageData = this.context.getImageData(this.x, this.y, this.canvas.width-20, 100);
  this.context.putImageData(imageData, this.x, this.y);
  this.context.clearRect(context.canvas.width-20, this.y, 1, 100);  //Clear the last pixel
  this.context.fillRect(this.vart + 50, this.vary+ny, 1,1);
  this.context.stroke();
};