Menu = function(title, items, y, size, width, callback)
{
  this.title = title;
  this.items = items;
  this.selectedItem = 0;
  this.callback = callback;
  this.y = y;
  this.size = size;
  this.width = width;
}

Menu.prototype.constructor = Menu;

Menu.prototype.Render = function(elapsed){
  //Gradient look
  var lingrad = context.createLinearGradient(0,0,0,canvas.height);
  lingrad.addColorStop(0, '#add8e6');
  lingrad.addColorStop(1, '#259');
  context.fillStyle = lingrad;
  context.fillRect(0,0,canvas.width, canvas.height);

  context.textAlign = "center";
  context.fillStyle = "White";

  var y = this.y;
  if (this.title){
    //Blinking text looks cool :P
    //var v = Math.floor(127*Math.cos(GameLoopManager.lastTime*0.04) + 127);
    context.fillStyle = "#FFCCCB";
    context.font = Math.floor(this.size*1.3).toString() + "px Arial";
    context.fillText(this.title, canvas.width/2, y);
    y += this.size;
  }

  for (var i = 0; i < this.items.length; ++i){
    var size = Math.floor(this.size*0.8);
    context.fillStyle = "white";
    size = this.size;
    context.font = size.toString() + "px Arial";
    y += this.size;
    context.fillText(this.items[i], canvas.width/2, y);
  }

}

Menu.prototype.mouseDown = function(e){
  canvas_x = e.pageX;
  canvas_y = e.pageY;
  if(canvas_x > canvas.width/2-this.width/2 && canvas_x < canvas.width/2+this.width/2){
    //I'm probably going to make a seperate class for buttons, but this will do for now
    alert("clicked (horizontal check only for now, fixing later)");
  }
}

Menu.prototype.Tick = function(elapsed){
  this.Render(elapsed);
}
