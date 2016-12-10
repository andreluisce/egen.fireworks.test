function launchRockets() {
    var r = new Rocket(new Vector2D(Math.random() * (window.innerWidth * 0.9 - window.innerWidth * 0.2) + window.innerWidth * 0.2, window.innerHeight, 0));
    r.launch();
    delete r; // to garbage collect this
}

var fountains = [];

fountains.push(new Fountain(new Vector2D(window.innerWidth * .2, window.innerHeight * 1.025), 1000, 10000));
fountains.push(new Fountain(new Vector2D(window.innerWidth * .4, window.innerHeight * 1.025), 2000, 4000));
fountains.push(new Fountain(new Vector2D(window.innerWidth * .6, window.innerHeight * 1.025), 3000, 3000));
fountains.push(new Fountain(new Vector2D(window.innerWidth * .8, window.innerHeight * 1.025), 4000, 6000));

function launchFountains() {


    for (var i = 0; i < fountains.length; i++) {

        fountains[i].launchUp();

    }

}

function setup() {
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setInterval(launchFountains, 100);
    //setInterval(launchRockets, 1500);
}

window.onload = function() {
    setup();
    (function loop(timestamp) {

        context.fillStyle = "rgba(0, 0, 0, .1)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < fountains.length; i++) {
            if (!fountains[i].stop) {
                if (timestamp >= fountains[i].startTime) {
                    fountains[i].isActive = true;
                }
                if (timestamp >= fountains[i].startTime + fountains[i].duration) {
                    fountains[i].isActive = false;
                }
            }

        }

        for (var i = 0; i < PARTICLES.length; i++) {
            // debugger;
            PARTICLES[i].update();
            if (PARTICLES[i].exists()) {
                PARTICLES[i].render(context);
            } else {
                if (PARTICLES[i] instanceof Rocket) {
                    PARTICLES[i].firework.pos = PARTICLES[i].pos;
                    PARTICLES[i].firework.explode();
                }
                PARTICLES.splice(i, 1);
            }
        }



        // console.log("Particles : " + PARTICLES.length)
        while (PARTICLES.length > MAX_ELEMENTS) {
            PARTICLES.shift();
        }

        requestAnimationFrame(loop);
    })();
};