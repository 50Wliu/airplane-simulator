"use strict";
function FloatingObjectManager()
{
	var objectArray = [];
	this.objectArray = objectArray;
	this.interval = null;
}

FloatingObjectManager.prototype.createObject = function(source, amount)
{
	for(var i = 0; i < amount; i++)
	{
		this.objectArray.push(new FloatingObject(source, Math.random() * canvas.width, Math.random() * canvas.height, 0.3, Math.random() * 4 + 1));
	}
};

FloatingObjectManager.prototype.move = function()
{
	var bindThis = this;
	this.interval = setInterval(function()
	{
		for(var i = 0; i < bindThis.objectArray.length; i++)
		{
			bindThis.objectArray[i].setCoords(bindThis.objectArray[i].x, bindThis.objectArray[i].y, bindThis.objectArray[i].speed);
			bindThis.objectArray[i].draw();
		}
	}, 1000 / 30);
};

FloatingObjectManager.prototype.stop = function()
{
	clearInterval(this.interval);
};