function Particle(pos) {
    this.id = 0;
    this.pos = new Vector2D(0, 0);
    this.pos.x = pos.x;
    this.pos.y = pos.y;
    this.gravity = new Vector2D(0, 0.02);
    this.friction = 0.92;
    this.decrease = 0.92;
    this.speed = new Vector2D(0, 0);
    this.color = Hex2RGB("000000", 10);
    this.scale = 4;
}

Particle.prototype.update = function() {
    this.speed.mult(this.friction);
    this.speed.add(this.gravity);
    this.pos.add(this.speed);
    this.scale *= Math.abs(Math.pow(this.decrease, .6));
};

Particle.prototype.render = function(c) {
    c.save();
    c.globalCompositeOperation = 'lighter';
    var gradient = c.createRadialGradient(this.pos.x, this.pos.y, 0.1, this.pos.x, this.pos.y, this.scale / 2);
    gradient.addColorStop(0.1, "rgba(255,255,255,1)");
    gradient.addColorStop(0.8, this.color);
    gradient.addColorStop(1, this.color);

    c.fillStyle = gradient;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, Math.random() * this.scale, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();
    c.restore();
};

Particle.prototype.exists = function() {
    return this.scale >= 0.01;
};