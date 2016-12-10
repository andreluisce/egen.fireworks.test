var canvas = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    MAX_FIREWORKS = 150,
    MAX_FOUNTAINS = 150,
    PARTICLES_FOUNTAINS = [],
    PARTICLES_FIREWORKS = [],
    FOUNTAINS = [],
    ROCKETS = [],
    CONFIG_JSON = [],
    START_TIME = 0.0;

(function ReadXMLConfig() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            CONFIG_JSON = xml2json(xmlhttp.response).FireworkDisplay.Firework;
        }
    }

    xmlhttp.open("GET", "./././fireworks.xml", false);
    xmlhttp.send();
})();