function Rocket(pos, startTime, hexColor) {
    Particle.apply(this, [pos]);
    this.firework = new Firework(Math.floor(Math.random() * (50 - 40) + 40), null, hexColor);
    this.speed = new Vector2D(Math.random() * (10 - (-10)) + (-10), Math.random() * (-60 - (-50)) + (-50));
    this.scale = Math.random() * 35;
    this.gravity = new Vector2D(0, 0.9);
    this.isActive = false;
    this.color = Hex2RGB("FFFFFF", 10);
    this.startTime = startTime;
    this.isLaunched = false;
}

Rocket.prototype = new Particle(new Vector2D(0, 0));

Rocket.prototype.launch = function(x) {
    if (!this.isLaunched && this.isActive) {
        PARTICLES_FIREWORKS.push(this);
        this.isLaunched = true;
    }

}
Rocket.prototype.render = function(c) {
    if (this.speed.y >= 0) {
        this.scale = 0;
    }
    Particle.prototype.render.apply(this, [c]);

};