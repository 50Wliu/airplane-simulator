"use strict";

function FloatingObject(source, x, y, scale, speed)
{
	this.source = source;
	this.x = x;
	this.y = y;
	this.scale = scale;
	this.speed = speed;
	this.image = new Image();
	this.image.src = source;

	var bindThis = this;  //Convince onload that we actually mean FloatingObject
	this.image.onload = function()
	{
		bindThis.width = Math.round(bindThis.image.width * scale);
		bindThis.height = Math.round(bindThis.image.height * scale);
	};
}

FloatingObject.prototype.draw = function()
{
	//We floor the x and y values here because .clearRect can't reliably erase parts of a pixel
	context.clearRect(Math.floor(this.x - this.speed), Math.floor(this.y), this.width, this.height);
	context.drawImage(this.image, this.x, this.y, this.width, this.height);
};

FloatingObject.prototype.setCoords = function(x, y, speed)
{
	if(x >= canvas.width + speed)  //The object has passed the edge of the canvas
	{
		this.x = -this.width;  //Move it in gracefully instead of just reappearing
		this.y = Math.random() * (canvas.height - this.height);  //Subtract the image's height so that it doesn't go partly offscreen
		this.speed = Math.random() * 4 + 1;
		return;
	}

	this.x = x + speed;
	this.y = y;
	this.speed = speed;
};