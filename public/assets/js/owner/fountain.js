function Fountain(vector) {
    Particle.apply(this, [vector]);
    this.firework = new Firework(Math.floor(Math.random() * (30 - 10) + 10));
    this.size = 16;
}

Fountain.prototype = new Particle(new Vector2D(0, 0));