<<<<<<< HEAD
window.Frontend = {
  loadPlanes:function(model, nickname, posX, posY, posZ){
    console.log(model+ " "+ nickname + " " + posX);
    loadPlane(model, nickname, posX, posY, posZ);
  },
  setPlaneProperties:function(id, posX, posY, posZ){
    cPlanes[id].dae.position.x = posX;
    cPlanes[id].dae.position.y = posY;
    cPlanes[id].dae.position.z = posZ;
  }
}
=======
window.Frontend = {
  loadPlanes:function(model, nickname, posX, posY, posZ){
    console.log(model+ " "+ nickname + " " + posX);
    loadPlane(model, nickname, posX, posY, posZ);
  }
}
>>>>>>> 7d843b8ef39ce84e23bcb20dc99ce44ada3b85ee
