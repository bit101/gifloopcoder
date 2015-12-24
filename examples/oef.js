function onGLC(glc) {
    glc.loop();
    var list = glc.renderList,
        width = glc.w,
        height = glc.h,
        color = glc.color;
    glc.styles.backgroundColor = "#666666";

    list.addCube({
        x: width / 2,
        y: height / 2,
        size: 100,
        rotationX: 30,
        rotationY: [-30, 30],
        strokeStyle: "white"
    });

    list.addText({
        x: [width / 2 - 20, width /2 + 20],
        y: height / 2 + 20,
        fontSize: 12,
        text: "glc",
        fillStyle: "white",
    });
    
    var context = glc.context;

    // gets executed prior to rendering shapes in renderList
    glc.onEnterFrame = function(t) {
        var res = 720;
        context.beginPath();
        for(var i = 0; i < res; i++) {
            // just some crazy trig to make a circular path with a varying radius.
            var angle = Math.PI * 2 / res * i,
                radius = width / 2 - 50 + Math.sin(angle * 10) * 30 * (t - 0.5) * 2 + Math.cos(angle * 33) * 10 + Math.sin(angle * 97+t*30) * 5* (t - 0.5) * 2;
            context.lineTo(width / 2 + Math.cos(angle) * radius, height / 2 + Math.sin(angle) * radius);
        }
        context.closePath();
        context.fillStyle = "black";
        context.fill();
    }

    // gets executed after rendering renderList
    glc.onExitFrame = function(t) {
        var res = 10;
        context.strokeStyle = "red";
        context.lineWidth = t * 25 + 0.5;
        context.beginPath();
        context.moveTo(0, height / 2);
        // just a crooked line.
        for(var i = res; i < width + res; i += res) {
            context.lineTo(i, height / 2 + Math.random() * 100 - 50);
        }
        context.stroke();
    }
}