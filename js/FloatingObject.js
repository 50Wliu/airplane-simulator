function FloatingObject(source, x,y,scale){
  this.source = source;
  this.x = x;
  this.y = y;
  this.scale = scale;
  this.image = new Image();
  this.image.src = source;
  this.width = this.image.width*this.scale;
  this.height = this.image.height*this.scale;
}

FloatingObject.prototype.draw = function(){
  var image = this.image;
  var imageWidth = Math.round(image.width * this.scale);
  var imageHeight = Math.round(image.height * this.scale);
  context.clearRect(this.x-1,this.y,imageWidth, imageHeight);
  context.drawImage(image,this.x,this.y,imageWidth,imageHeight);
}

FloatingObject.prototype.setCord = function(x,y){
  if(x >= canvas.width){
    x = 0 - this.image.width*this.scale;
  }
  this.x = x;
  this.y = y;

}
