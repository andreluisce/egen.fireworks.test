function Particle(pos) {
    this.pos = pos;
    this.size = 4;
    this.gravity = new Vector2D(0, 0.2);
    this.resistance = 0.92;
    this.shrink = 0.97;
    this.color = Math.floor(Math.random() * 360 / 10) * 10;
    this.vel = new Vector2D(0, 0);
}

Particle.prototype.update = function() {
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

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, Math.random() * this.size, 0, Math.PI * 2, false);
    c.closePath();
    c.fill();
    c.restore();
};

Particle.prototype.exists = function() {
    return this.size >= 1;
};