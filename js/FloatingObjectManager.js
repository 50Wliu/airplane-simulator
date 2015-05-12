function FloatingObjectManager(){
  var objectArray = [];
  this.objectArray = objectArray;
}

FloatingObjectManager.prototype.createObject = function(source,num){
  for(var i = 0; i < num; i++){
    this.objectArray.push(new FloatingObject(source, Math.round(Math.random()*canvas.width),Math.round(Math.random()*canvas.height),0.3));
    this.objectArray[i].draw();
  }
}
