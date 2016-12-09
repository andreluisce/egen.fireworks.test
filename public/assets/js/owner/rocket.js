function Rocket(vector) {
    Particle.apply(this, [vector]);
    this.firework = new Firework(Math.random() * 10 + 80);

}

Rocket.prototype = new Particle();


/*
Rocket.prototype.explode = function() {

    for (var i = 0; i < count; i++) {
        var particle = new Particle(this.pos);
        var angle = Math.random() * Math.PI * 2;

        // emulate 3D effect by using cosine and put more particles in the middle
        var speed = Math.cos(Math.random() * Math.PI / 2) * 15;

        particle.vel.x = Math.cos(angle) * speed;
        particle.vel.y = Math.sin(angle) * speed;
        particle.size = 10;
        particle.shrink = Math.random() * 0.05 + 0.93;
        particles.push(particle);
    }
};
*/
Rocket.prototype.render = function(c) {
    if (!this.exists()) {
        return;
    }

    c.save();
    //console.log(this.pos.y);
    console.log(this.vel.y);
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