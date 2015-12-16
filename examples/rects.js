function onGLC(glc) {
    glc.loop();
    glc.size(300, 300);
    // glc.setDuration(5);
    // glc.setFPS(20);
    // glc.setMode("single");
    // glc.setEasing(false);
    // glc.setMaxColors(256);
    var list = glc.renderList,
        width = glc.w,
        height = glc.h;

    // your code goes here:

    list.addRect({
        x: 75,
        y: 75,
        w: [50, 100],
        h: 50
    });

    list.addRect({
        x: 75,
        y: 225,
        w: [50, 100],
        h: 50,
        drawFromCenter: false
    });
    list.addRect({
        x: 225,
        y: 75,
        w: 50,
        h: 50,
        rotation: [-45, 45]
    });

    list.addRect({
        x: 225,
        y: 225,
        w: 50,
        h: 50,
        rotation: [-45, 45],
        drawFromCenter: false
    });

    list.addLine({
        x0: 75,
        y0: 0,
        x1: 75,
        y1: height,
        lineWidth: 1,
        strokeStyle: "red"
    });
    list.addLine({
        x0: 225,
        y0: 0,
        x1: 225,
        y1: height,
        lineWidth: 1,
        strokeStyle: "red"
    });
    list.addLine({
        x0: 0,
        y0: 75,
        x1: width,
        y1: 75,
        lineWidth: 1,
        strokeStyle: "red"
    });
    list.addLine({
        x0: 0,
        y0: 225,
        x1: width,
        y1: 225,
        lineWidth: 1,
        strokeStyle: "red"
    });

    list.addText({
        text: "drawFromCenter: true",
        x: 150,
        y: 120
    });
    list.addText({
        text: "drawFromCenter: false",
        x: 150,
        y: 180
    });


}       