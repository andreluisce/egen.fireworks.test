function Fountain(pos, startTime, duration, hexColor) {
    Particle.apply(this, [pos]);
    this.particlesCount = 5;
    this.particleColor = Hex2RGB(hexColor, 10);
    this.isActive = false;
    this.startTime = startTime;
    this.duration = duration;
}

Fountain.prototype = new Particle(new Vector2D(0, 0));

Fountain.prototype.launchUp = function() {
    if (this.isActive) {
        for (var i = 0; i < this.particlesCount; i++) {
            var particle = new Particle(this.pos);
            particle.color = this.particleColor;
            particle.friction = 0.9;
            particle.decrease = 0.95;
            particle.scale = 17;
            particle.gravity = new Vector2D(0, 0.4);
            particle.speed = new Vector2D(Math.random() * 12 - 5, Math.random() * -15 - 15);
            PARTICLES_FOUNTAINS.push(particle);
        }
        delete this;
    }
};