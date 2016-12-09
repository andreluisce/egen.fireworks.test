function Firework(numParticles, pos) {
    this.particles = [];
    this.particlesCount = numParticles || 50;
    this.pos = pos || new Vector2D(0, 0);
}

Firework.prototype.explode = function() {
    for (var i = 0; i < this.particlesCount; i++) {
        //var pos = new Vector2D(posMouse.x, posMouse.y);
        //debugger;
        var particle = new Particle(this.pos);
        var angle = Math.random() * Math.PI * 2;
        var speed = Math.random() * 10 + 2;
        particle.vel = new Vector2D(Math.cos(angle) * speed, Math.sin(angle) * speed);
        this.particles.push(particle);
    }
}