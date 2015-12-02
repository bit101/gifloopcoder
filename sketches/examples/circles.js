function onGLC(glc) {
    glc.loop();
    // glc.size(400, 400);
    // glc.setDuration(5);
    // glc.setFPS(20);
    // glc.setMode("single");
    // glc.setEasing(false);
    // glc.setMaxColors(256);
    var list = glc.renderList,
        width = glc.w,
        height = glc.h;


    list.addCircle({
        x: 80,
        y: 80,
        stroke: true,
        fill: false,
        radius: 40,
        startAngle: [0, 90],
        endAngle: [360, 270],
        lineWidth: 30,
        lineCap: "butt"
    });

    list.addCircle({
        x: 200,
        y: 80,
        stroke: true,
        fill: false,
        radius: 40,
        startAngle: 45,
        endAngle: 315,
        lineWidth: 30,
        rotation: [0, 360],
        lineCap: "butt"
    });

    list.addCircle({
        x: 320,
        y: 80,
        stroke: true,
        fill: false,
        radius: 40,
        lineWidth: [1, 30]
    });

    list.addCircle({
        x: 80,
        y: 200,
        stroke: true,
        fill: false,
        radius: [10, 40],
    });

    list.addCircle({
        x: 200,
        y: 200,
        stroke: true,
        fill: false,
        radius: 40,
        lineDash: [[10, 5], [40, 10]]
    });

    list.addCircle({
        x: 320,
        y: 200,
        radius: 40,
        fillStyle: ["#ff0000", "#ffff00"]
    });

    list.addCircle({
        x: 80,
        y: 320,
        radius: 40,
        shadowColor: "#50000000",
        shadowOffsetX: [-20, 20],
        shadowOffsetY: 20,
        shadowBlur: 20
    });

    list.addCircle({
        x: 200,
        y: 320,
        stroke: true,
        fill: [true, false, true, false, true, false],
        radius: 40,
    });

    list.addCircle({
        x: 320,
        y: 320,
        radius: 40,
        fillStyle: ["#ff0000ff", "#000000ff"]
    });


}