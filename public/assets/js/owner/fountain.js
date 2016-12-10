function Fountain(pos, startTime, duration) {
    this.particlesCount = 10;
    this.particleColor = Math.floor(Math.random() * 36) * 10;
    this.isActive = false;
    this.startTime = startTime;
    this.duration = duration;
    this.stop = false;
}

Fountain.prototype = new Particle(new Vector2D(0, 0));

Fountain.prototype.launchUp = function() {
    if (this.isActive) {
        for (var i = 0; i < this.particlesCount; i++) {
            var particle = new Particle(this.pos);
            particle.color = this.particleColor;
            particle.friction = 0.9;
            particle.decrease = .95;
            particle.scale = 17;
            particle.gravity = new Vector2D(0, 0.4);
            particle.speed = new Vector2D(Math.random() * 12 - 5, Math.random() * -20 - 20);
            PARTICLES.push(particle);
        }
        delete this;
    }
}