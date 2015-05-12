var GameLoopManager = new function() {
  this.lastTime = 0;
  this.gameTick = null;
  this.prevElapsed = 0;
  this.prevElapsed2 = 0;

  this.run = function(gameTick) {
    var prevTick = this.gameTick;
    this.gameTick = gameTick;
    if (this.lastTime == 0)
    {
      var bindThis = this;
      requestAnimationFrame(function() { bindThis.tick(); } );
      this.lastTime = 0;
    }
  }

  this.stop = function() {
    this.run(null);
  }

  this.tick = function () {
    if (this.gameTick != null)
    {
      var bindThis = this;
      requestAnimationFrame(function() { bindThis.tick(); } );
    }
    else
    {
      this.lastTime = 0;
      return;
    }
    var timeNow = Date.now();
    var elapsed = timeNow - this.lastTime;
    if (elapsed > 0)
    {
      if (this.lastTime != 0)
      {
        if (elapsed > 1000)
          elapsed = 1000;
          // Hackish fps smoothing
          var smoothElapsed = (elapsed + this.prevElapsed + this.prevElapsed2)/3;
          this.gameTick(0.001*smoothElapsed);
          this.prevElapsed2 = this.prevElapsed;
          this.prevElapsed = elapsed;
        }
        this.lastTime = timeNow;
      }
    }
  }
