// create canvas
var canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    particles = [],
    isClicked = false,
    existingFireworks = [],
    rockets = [];
var firework = new Firework(1, new Vector2D(window.innerWidth / 2, window.innerHeight / 2));

function launchRockets() {
    launchFromPoint(new Vector2D(Math.random() * (window.innerWidth * 0.9 - window.innerWidth * 0.2) + window.innerWidth * 0.2, window.innerHeight));
}

function launchFromPoint(x) {
    if (rockets.length < 10) {
        var rocket = new Rocket(x);
        rocket.vel = new Vector2D(Math.random() * -30, Math.random() * -30 - 30);
        rocket.size = 8;
        rocket.gravity = new Vector2D(0, 0.9);

        rockets.push(rocket);
    }
}

function setup() {
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setInterval(launchRockets, 2000)

    onclick = function(e) {
        // firework = new Firework(10, new Vector2D(window.innerWidth / 2, window.innerHeight / 2));
        // isClicked = true;
    }
}

window.onload = function() {

    setup();

    (function loop() {
        context.fillStyle = "rgba(0, 0, 0, .1)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        if (isClicked) {
            //firework.explode();

        }

        //isClicked = false;

        for (var i = 0; i < rockets.length; i++) {
            rockets[i].update();
            if (rockets[i].exists()) {
                rockets[i].render(context);
            } else {
                rockets[i].firework.pos = rockets[i].pos;
                rockets[i].firework.explode();

                existingFireworks.push(rockets[i].firework.particles)
                rockets.splice(i, 1);
            }
        }
        for (var j = 0; j < existingFireworks.length; j++) {
            for (var i = 0; i < existingFireworks[j].length; i++) {
                existingFireworks[j][i].update();
                if (existingFireworks[j][i].exists()) {
                    existingFireworks[j][i].render(context);
                } else {
                    existingFireworks[j].splice(i, 1);
                }
            }
        }


        /*for (var i = 0; i < firework.particles.length; i++) {
            firework.particles[i].update();
            if (firework.particles[i].exists()) {
                firework.particles[i].render(context);
            } else {
                firework.particles.splice(i, 1);
            }
        }
*/

        requestAnimationFrame(loop);
    })();
};