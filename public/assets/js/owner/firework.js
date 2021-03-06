function Firework(numParticles, pos, hexColor) {
    this.particles = [];
    this.particlesCount = numParticles || 50;
    this.pos = pos || new Vector2D(0, 0);
    this.particleScale = 45;
    this.particleColor = Hex2RGB(hexColor, 10);
}

Firework.prototype.explode = function() {
    for (var i = 0; i < this.particlesCount; i++) {
        var particle = new Particle(this.pos);
        particle.color = this.particleColor;
        particle.scale = this.particleScale;

        var angle = Math.random() * Math.PI * 2;
        var speed = Math.random() * 10;

        particle.speed = new Vector2D(Math.cos(angle) * speed, Math.sin(angle) * speed);
        PARTICLES_FIREWORKS.push(particle);
    }
}