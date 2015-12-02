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

    // doesn't really contain ALL shapes anymore...

    list.addLine({
        translationX: width * 0.16,
        translationY: height * 0.16,
        x0: -50,
        y0: -50,
        x1: 50,
        y1: [50, -50]
    });

    list.addSegment({
        translationX: width * 0.16,
        translationY: height * 0.16 + 10,
        x0: -50,
        y0: -50,
        x1: 50,
        y1: 50
    });

    list.addBezierCurve({
        translationX: width * 0.5,
        translationY: height * 0.16,
        x0: -30,
        y0: -50,
        x1: [75, -75],
        y1: 30,
        x2: [-75, 75],
        y2: 30,
        x3: 30,
        y3: -50
    });

    list.addBezierSegment({
        translationX: width * 0.5,
        translationY: height * 0.16 + 30,
        x0: -50,
        y0: -50,
        x1: 75,
        y1: 50,
        x2: -75,
        y2: 50,
        x3: 50,
        y3: -50
    });

    list.addCurve({
        translationX: width * 0.83,
        translationY: height * 0.16,
        x0: -30,
        y0: -50,
        x1: [-50, 50],
        y1: 70,
        x2: 30,
        y2: -50
    });

    list.addCurveSegment({
        translationX: width * 0.83,
        translationY: height * 0.16 + 30,
        x0: -50,
        y0: -50,
        x1: 0,
        y1: 100,
        x2: 50,
        y2: -50
    });

    list.addArcSegment({
        translationX: width * 0.16,
        translationY: height * 0.5,
        x: 0,
        y: 0,
        radius: 50,
        arc: 45,
        startAngle: 90,
        endAngle: 270
    });

    list.addRect({
        translationX: width * 0.5,
        translationY: height * 0.5,
        x: 0,
        y: 0,
        w: [50, 100],
        h: [100, 50]
    });

    list.addText({
        translationX: width * 0.83,
        translationY: height * 0.5,
        x: 0,
        y: 0,
        rotation: [-45, 45]
    })


    list.addCircle({
        translationX: width * 0.16,
        translationY: height * 0.83,
        x: 0,
        y: 0,
        radius: [20, 50]
    });

    list.addPoly({
        translationX: width * 0.5,
        translationY: height * 0.83,
        x: 0,
        y: 0,
        rotation: [0, 90]
    });

    list.addStar({
        translationX: width * 0.83,
        translationY: height * 0.83,
        x: 0,
        y: 0,
        rotation: [0, 90]
    });


}