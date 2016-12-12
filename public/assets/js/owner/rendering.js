(function(w) {
    function startConfig() {
        for (var i = 0; i < CONFIG_JSON.length; i++) {
            switch (CONFIG_JSON[i].type) {
                case "Fountain":
                    FOUNTAINS.push(new Fountain(new Vector2D(window.innerWidth / 2 * parseFloat(CONFIG_JSON[i].Position.x), window.innerHeight * 1.025), parseInt(CONFIG_JSON[i].begin), parseInt(CONFIG_JSON[i].duration), CONFIG_JSON[i].colour));
                    break;
                case "Rocket":
                    ROCKETS.push(new Rocket(new Vector2D(window.innerWidth / 2 * parseFloat(CONFIG_JSON[i].Position.x), window.innerHeight * 1), CONFIG_JSON[i].Velocity, parseInt(CONFIG_JSON[i].begin), CONFIG_JSON[i].colour));
                    break;
                default:
                    break;
            }
        }
    }

    function launchRockets() {
        for (var i = 0; i < ROCKETS.length; i++) {
            if (ROCKETS[i].isLaunched) {
                ROCKETS.splice(i, 1);
                continue;
            }
            ROCKETS[i].launch();
        }
    }

    function launchFountains() {
        for (var i = 0; i < FOUNTAINS.length; i++) {
            FOUNTAINS[i].launchUp();
        }
    }

    function startUp() {
        document.body.appendChild(canvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        setInterval(launchFountains, 100);
        setInterval(launchRockets, 1500);
    }

    w.Rendering = {
        startConfig: startConfig,
        launchRockets: launchRockets,
        launchFountains: launchFountains,
        startUp: startUp
    };

})(window);

Rendering.startConfig();

window.onload = function() {
    Rendering.startUp();

    (function update(timestamp) {
        //Clear the canvas
        context.fillStyle = "rgba(0, 0, 0, .1)";
        context.fillRect(0, 0, canvas.width, canvas.height);

        //Show and Hide the Fountains
        for (var i = 0; i < FOUNTAINS.length; i++) {
            if (timestamp >= (FOUNTAINS[i].startTime + START_TIME)) {
                FOUNTAINS[i].isActive = true;
            }
            if (timestamp >= (FOUNTAINS[i].startTime + START_TIME) + (FOUNTAINS[i].duration + START_TIME)) {
                FOUNTAINS[i].isActive = false;
            }
        }

        //Show and Hide the Rockets
        for (var i = 0; i < ROCKETS.length; i++) {
            if (timestamp >= (ROCKETS[i].startTime + START_TIME)) {
                ROCKETS[i].isActive = true;
            }
            if (timestamp >= (ROCKETS[i].startTime + START_TIME) + (ROCKETS[i].duration + START_TIME)) {
                ROCKETS[i].isActive = false;
            }
        }

        //Show the Rockets and Fireworks Particles
        for (var i = 0; i < PARTICLES_FIREWORKS.length; i++) {
            PARTICLES_FIREWORKS[i].update();
            if (PARTICLES_FIREWORKS[i].exists()) {
                PARTICLES_FIREWORKS[i].render(context);
            } else {
                if (PARTICLES_FIREWORKS[i] instanceof Rocket) {
                    PARTICLES_FIREWORKS[i].firework.pos = PARTICLES_FIREWORKS[i].pos;
                    PARTICLES_FIREWORKS[i].firework.explode();
                }
                PARTICLES_FIREWORKS.splice(i, 1);
            }
        }

        //Show the Fountain Particles
        for (var i = 0; i < PARTICLES_FOUNTAINS.length; i++) {
            PARTICLES_FOUNTAINS[i].update();
            if (PARTICLES_FOUNTAINS[i].exists()) {
                PARTICLES_FOUNTAINS[i].render(context);
            } else {
                PARTICLES_FOUNTAINS.splice(i, 1);
            }
        }

        //It doesn't allow the fireworks' particles exceeds the Max        
        while (PARTICLES_FIREWORKS.length > MAX_FIREWORKS) {
            PARTICLES_FIREWORKS.shift();
        }

        //It doesn't allow the fountains' particles exceeds the Max        
        while (PARTICLES_FOUNTAINS.length > MAX_FOUNTAINS) {
            PARTICLES_FOUNTAINS.shift();
        }

        var handle = requestAnimationFrame(update);

        //This is for looping the animation set
        if (timestamp > (START_TIME + 9500)) {
            console.log(START_TIME)
            cancelAnimationFrame(handle);
            handle = requestAnimationFrame(update);
            FOUNTAINS = [];
            ROCKETS = [];
            Rendering.startConfig();
            START_TIME = timestamp;
        }
    })();
};