var player, theGround;

function setup() {
  createCanvas(720, 400);
  player = new Ball(300, 100, 32);
  theGround = new Ground(0, 360, width, 100);
}

function Ball(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.g = 0.8;
  this.a = 0.8;
  this.vv = 0;
  this.vh = 0;
  this.vvMax = 10;
  this.vhMax = 7;
  this.yStart = y;
  this.hue = 0;
  this.colMax = 100;

  this.draw = function() {
    if (this.hue > this.colMax) this.hue = 0;
    colorMode(HSB, this.colMax);
    fill(this.hue, 90, 70);
    ellipse(this.x, this.y, this.r, this.r);
  };
  this.onGround = function() {
    return Math.round(this.y + this.r / 2) === theGround.y;
  };
  this.inGround = function() {
    return Math.round(this.y + this.r / 2) > theGround.y;
  };
  this.inAir = function() {
    return !(this.onGround() || this.inGround());
  };

  this.move = function() {
    this.handleKeys();
    this.x += this.vh;
    this.vh /= 1.2;
    if (this.inAir()) this.y += this.vv;
    if (this.onGround()) this.vv = 0;
    if (this.vv < this.vvMax) this.vv += this.g;
    while (this.inGround()) this.y--;
    if (this.y > height) {
      this.vv = 0;
      this.y = this.yStart;
    }
  };
  this.handleKeys = function() {
    if (keyIsDown(UP_ARROW)) {
      this.y -= 1;
      this.vv = -10;
    }
    if (keyIsDown(LEFT_ARROW)) {
      if (Math.abs(this.vh) < this.vhMax)
        this.vh -= this.a;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      if (Math.abs(this.vh) < this.vhMax)
        this.vh += this.a;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW))
      this.hue++;
  }
}

function Ground(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.draw = function() {
    fill(100);
    rect(this.x, this.y, this.w, this.h);
  };
}

function draw() {
  background('rgba(0,0,0,0.01)');
  noStroke();
  player.move();
  player.draw();
  theGround.draw();
}
