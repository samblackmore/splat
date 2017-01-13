var player, theGround;

function setup() {
  createCanvas(720, 400);
  player = new Ball(300, 100, 32)
  theGround = new Ground(100, 300, 500, 32)
}

function Ball(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.g = 0.3;
  this.vv = 0;
  this.vvMax = 40;
  this.yStart = y;

  this.draw = function() {
    fill(255, 204, 0);
    ellipse(this.x, this.y, this.r, this.r);
  }
  this.onGround = function() {
    return Math.round(this.y + this.r / 2) === theGround.y;
  }
  this.inGround = function() {
    return Math.round(this.y + this.r / 2) > theGround.y;
  }
  this.inAir = function() {
    return !(this.onGround() || this.inGround());
  }
  this.fall = function() {
    if (this.inAir()) this.y += this.vv;
    if (this.vv < this.vvMax) this.vv += this.g;
    while (this.inGround()) this.y--;
    if (this.y > height) {
      this.vv = 0;
      this.y = this.yStart;
    }
  }
}

function Ground(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.draw = function() {
    fill(100);
    rect(this.x, this.y, this.w, this.h)
  }
}

function draw() {
  background(200);
  stroke(50);
  player.fall();
  player.draw();
  theGround.draw();
}
