"use strict";

function FloatingObject(source, x, y, scale)
{
	this.source = source;
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.image = new Image();
	var bindThis = this;  //Convince onload that we actually mean FloatingObject
	this.image.onload = function()
	{
		bindThis.width = bindThis.image.width * scale;
		bindThis.height = bindThis.image.height * scale;
	};
	this.image.src = source;
}

FloatingObject.prototype.draw = function()
{
	context.clearRect(this.x - 2, this.y, this.width, this.height);  //FIXME: Figure out why this leaves a rendering artifact using `this.x - 1`
	context.drawImage(this.image, this.x, this.y, this.width, this.height);
};

FloatingObject.prototype.setCoords = function(x, y)
{
	if(x >= canvas.width)  //The object has passed the edge of the canvas, so reset its path
	{
		x = -this.width;  //We want the object to move in gracefully instead of just reappearing
		y = Math.round(Math.random() * canvas.height);  //Randomize the height
	}
	this.x = x;
	this.y = y;
};