function Rocket(vector) {
    //Particle.apply(this, [vector]);
    this.firework = new Firework(Math.floor(Math.random() * (60 - 40) + 40));
    this.speed = new Vector2D(0, Math.random() * -25 - 35);
    this.scale = Math.random() * 15;
    this.gravity = new Vector2D(0, 0.9);
    this.isActive = true;
}

Rocket.prototype = new Particle(new Vector2D(0, 0));

Rocket.prototype.launch = function(x) {

    PARTICLES.push(this);

}
Rocket.prototype.render = function(c) {
    c.save();

    if (this.speed.y >= 0) {
        this.scale = 0;
    }

    c.globalCompositeOperation = 'lighter';
    var gradient = c.createRadialGradient(this.pos.x, this.pos.y, 0.1, this.pos.x, this.pos.y, this.scale / 2);
    gradient.addColorStop(0.1, "rgba(255, 255, 255 ,1)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");

    c.fillStyle = gradient;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, Math.random() * this.scale / 2 + this.scale / 2, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();

    c.restore();
};