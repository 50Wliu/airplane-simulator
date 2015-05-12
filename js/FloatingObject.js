function FloatingObject(source, x,y,scale){
  this.source = source;
  this.x = x;
  this.y = y;
  this.scale = scale;
  this.image = new Image();
  this.image.src = source;
}

FloatingObject.prototype.draw = function(){
  var image = this.image;
  console.log(image.width);
  context.drawImage(image, this.x,this.y,image.width*this.scale,image.height*this.scale);
}
