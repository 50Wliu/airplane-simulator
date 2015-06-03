"use strict";
function Graph(graphName, context, canvas, canvasOverlay, x, y)
{
	this.x = x;
	this.y = y;
	this.vart = x;
	this.vary = y + 50;
	this.context = context;
	var contextOverlay = canvasOverlay.getContext("2d");
	this.canvas = canvas;
	contextOverlay.beginPath();
	contextOverlay.setLineDash([1, 0]);
	contextOverlay.rect(x, y, canvasOverlay.width - 20, 100);
	contextOverlay.lineWidth = 1;
	contextOverlay.strokeStyle = 'black';
	contextOverlay.stroke();
	contextOverlay.setLineDash([2]);
	contextOverlay.moveTo(10, this.vary);
	contextOverlay.lineTo(canvasOverlay.width - 10, this.vary);
	contextOverlay.stroke();
	contextOverlay.font = "24px serif";
	contextOverlay.fillText(graphName, 10, y + 115 + 5);
}

Graph.prototype.drawDot = function(nt, ny)
{
    if(nt > this.context.canvas.width - 10 - 10)  //Don't keep drawing past the graph - "scroll" it instead
    {
        nt = this.context.canvas.width - 10 - 10;
    	var imageData = this.context.getImageData(this.x, this.y, this.canvas.width - 10, 100);
    	this.context.putImageData(imageData, this.x - 1, this.y);
    	//this.context.clearRect(this.context.canvas.width - 10, this.y, 1, 100);  //Clear the last pixel
    }

    if(this.vary + ny > this.y && this.vary + ny < this.y + 100)  //Make sure we're within the bounds of the graph
    {
        this.context.fillRect(nt, this.vary + ny, 1, 1);
    }
	this.context.stroke();
};