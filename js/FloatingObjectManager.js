"use strict";
function FloatingObjectManager()
{
	var objectArray = [];
	this.objectArray = objectArray;
}

FloatingObjectManager.prototype.createObject = function(source, amount)
{
	for(var i = 0; i < amount; i++)
	{
		this.objectArray.push(new FloatingObject(source, Math.round(Math.random()*canvas.width), Math.round(Math.random()*canvas.height), 0.3));
	}
};

FloatingObjectManager.prototype.move = function()
{
	var bindThis = this;
	setInterval(function()
	{
		for(var i = 0; i < bindThis.objectArray.length; i++)
		{
			bindThis.objectArray[i].setCoords(bindThis.objectArray[i].x + 1, bindThis.objectArray[i].y);
			bindThis.objectArray[i].draw();
		}
	}, 1000 / 30);
};