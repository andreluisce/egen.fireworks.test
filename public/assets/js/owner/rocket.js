function Rocket(vector) {
    Particle.apply(this, [vector]);
    this.firework = new Firework(Math.floor(Math.random() * (30 - 10) + 10));

}

Rocket.prototype = new Particle(new Vector2D(0, 0));

Rocket.prototype.render = function(c) {
    c.save();

    if (this.vel.y >= 0) {
        this.size = 0;
    }

    c.globalCompositeOperation = 'lighter';
    var gradient = c.createRadialGradient(this.pos.x, this.pos.y, 0.1, this.pos.x, this.pos.y, this.size / 2);
    gradient.addColorStop(0.1, "rgba(255, 255, 255 ,1)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");

    c.fillStyle = gradient;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, Math.random() * this.size / 2 + this.size / 2, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();

    c.restore();
};