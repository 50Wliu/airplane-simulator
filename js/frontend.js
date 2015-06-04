window.Frontend = {
  loadPlanes:function(model, nickname, posX, posY, posZ){
    console.log(model+ " "+ nickname + " " + posX);
    loadPlane(model, nickname, posX, posY, posZ);
  }
}
