function FloatingObjectManager(){
  var objectArray = [];
  this.objectArray = objectArray;
}

FloatingObjectManager.prototype.createObject = function(source,num){
  for(var i = 0; i < num; i++){
    this.objectArray.push(new FloatingObject(source, Math.round(Math.random()*canvas.width),Math.round(Math.random()*canvas.height),0.3));
  }
}

FloatingObjectManager.prototype.move = function(){
  var bindThis = this;
  setTimeout(function() {
    requestAnimationFrame(function(){bindThis.move()});
    for(var i = 0; i < bindThis.objectArray.length; i++){
      bindThis.objectArray[i].setCord(bindThis.objectArray[i].x +1 , bindThis.objectArray[i].y);
      bindThis.objectArray[i].draw();
    }
  }, 1000 / 30);
}
