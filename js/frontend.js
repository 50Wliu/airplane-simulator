window.Frontend = {
  loadPlanes:function(uuid, model, nickname, posX, posY, posZ){
    loadPlane(uuid, model, nickname, posX, posY, posZ);
  },
  setPlaneProperties:function(id, posX, posY, posZ){
    cPlanes[id].dae.position.x = posX;
    cPlanes[id].dae.position.y = posY;
    cPlanes[id].dae.position.z = posZ;
  }
}
