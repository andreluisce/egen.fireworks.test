// create canvas
canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    particles = [],
    isClicked = false,
    existingFireworks = [],
    rockets = [],
    posMouse = new Vector2D(window.innerWidth / 2, window.innerHeight / 2);
var fireworks = [];
fireworks.push(new Firework(100, posMouse));

function launch() {
    launchFrom(new Vector2D(Math.random() * window.innerWidth, window.innerHeight));
}

function launchFrom(x) {
    if (rockets.length < 10) {
        var rocket = new Rocket(x);
        rocket.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;

        rocket.vel.y = Math.random() * -30 - 30;
        rocket.vel.x = 0; //;/Math.random() * 6 - 3;
        rocket.size = 8;
        rocket.shrink = 0.92;
        rocket.gravity = new Vector2D(0, 0.9);

        rockets.push(rocket);
    }
}

function setup() {
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    onmousemove = function(e) {
        posMouse.x = e.clientX;
        posMouse.y = e.clientY;
    }
    onclick = function(e) {
        isClicked = true;
        // launch();
    }
}

window.onload = function() {

    setup();

    (function loop() {
        context.fillStyle = "rgba(0, 0, 0, .1)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        if (isClicked) {
            fireworks[0].explode();
            existingFireworks.push(fireworks[0].particles);
        }

        isClicked = false;

        for (var i = 0; i < rockets.length; i++) {
            rockets[i].update();
            if (rockets[i].exists()) {
                rockets[i].render(context);
            } else {
                //debugger;
                rockets[i].firework.pos = rockets[i].pos;
                rockets[i].firework.explode();

                existingFireworks.push(fireworks[0].particles)
                existingFireworks.push(rockets[i].firework.particles)
                rockets.splice(i, 1);
            }
        }

        for (var j = 0; j < existingFireworks.length; j++) {
            for (var i = 0; i < existingFireworks[j].length; i++) {
                //debugger;
                existingFireworks[j][i].update();
                if (existingFireworks[j][i].exists()) {
                    existingFireworks[j][i].render(context);
                } else {
                    existingFireworks[j].splice(i, 1);
                }
            }
        }
        requestAnimationFrame(loop);
    })();
};