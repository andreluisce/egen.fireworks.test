function Particle(pos) {
    this.id = 0;
    this.pos = new Vector2D(0, 0);
    this.pos.x = pos.x;
    this.pos.y = pos.y;
    this.size = 16;
    this.gravity = new Vector2D(0, 0.02);
    this.resistance = 0.92;
    this.shrink = 0.92;
    this.color = Math.floor(Math.random() * 360 / 10) * 10;
    //vel = new Vector2D(0, 0);
    var angle = Math.random() * Math.PI * 2;
    var speed = Math.random() * 10 + 2;
    this.vel = new Vector2D(Math.cos(angle) * speed, Math.sin(angle) * speed);

}

Particle.prototype.update = function() {
    console.log("Update>> ID: " + this.id + " - Posisao X: " + this.pos.x + "/nPosisao X: " + this.pos.y + "/nVelocidade X: " + this.vel.x + "/nVelocidade Y: " + this.vel.y);
    this.vel.mult(this.resistance);
    this.vel.add(this.gravity);
    this.pos.add(this.vel);
    this.size *= this.shrink;
};

Particle.prototype.render = function(c) {

    c.save();
    c.globalCompositeOperation = 'lighter';
    var gradient = c.createRadialGradient(this.pos.x, this.pos.y, 0.1, this.pos.x, this.pos.y, this.size / 2);
    gradient.addColorStop(0.1, "rgba(255,255,255,1)");
    gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, 0.1)");
    gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");

    c.fillStyle = gradient;
    console.log("Update>> ID: " + this.id + " - Posisao X: " + this.pos.x + "/nPosisao X: " + this.pos.y + "/nVelocidade X: " + this.vel.x + "/nVelocidade Y: " + this.vel.y);
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, Math.random() * this.size, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();
    c.restore();
};

Particle.prototype.exists = function() {
    return this.size >= 0.01;
};