function Firework(numParticles, pos) {
    this.particles = [];
    this.particlesCount = numParticles || 50;
    this.pos = pos || new Vector2D(0, 0);
}

Firework.prototype.explode = function() {
    for (var i = 0; i < this.particlesCount; i++) {
        var particle = new Particle(this.pos);
        particle.id = i + 1;
        this.particles.push(particle);
    }
}