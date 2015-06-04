"use strict";
function Graph(graphName, context, canvas, canvasOverlay, x, y)
{
	this.x = x;
	this.y = y;
	this.vart = x;
	this.vary = y + 50;
	this.context = context;
	this.contextOverlay = canvasOverlay.getContext("2d");
	this.canvas = canvas;

	//Draw the graph boundaries
	this.contextOverlay.beginPath();
	this.contextOverlay.rect(x, y, canvasOverlay.width - 20, 100);
	this.contextOverlay.stroke();

	//Draw the center line
	this.contextOverlay.save();
	this.contextOverlay.setLineDash([2]);
	this.contextOverlay.moveTo(10, this.vary);
	this.contextOverlay.lineTo(canvasOverlay.width - 10, this.vary);
	this.contextOverlay.stroke();
	this.contextOverlay.restore();

	//Draw the graph name
	this.contextOverlay.font = "24px serif";
	this.contextOverlay.fillText(graphName, 10, y + 115 + 5);
}

Graph.prototype.drawDot = function(nt, ny)
{
	if(nt > this.context.canvas.width - 10 - 10)  //Don't keep drawing past the graph - "scroll" it instead
	{
		nt = this.context.canvas.width - 10 - 10;
		var imageData = this.context.getImageData(this.x, this.y, this.canvas.width - 10, 100);
		this.context.putImageData(imageData, this.x - 1, this.y);
		//this.context.clearRect(this.context.canvas.width - 10, this.y, 1, 100);  //Clear the last pixel TODO: Is this needed?
	}

	if(this.vary + ny > this.y && this.vary + ny < this.y + 100)  //Make sure we're within the bounds of the graph
	{
		this.context.fillRect(nt, this.vary + ny, 1, 1);
	}
	this.context.stroke();
};