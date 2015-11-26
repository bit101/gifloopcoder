function onGLC(glc) {
    glc.loop();
    // glc.playOnce();
    // glc.size(400, 400);
    glc.setDuration(1);
    // glc.setFPS(20);
    // glc.setMode("single");
    // glc.setEasing(false);
    var list = glc.renderList,
        width = glc.w,
        height = glc.h,
        color = glc.color;

    // default is scene 0
    // create 4 circles. animate the first one.
    list.addCircle({
        x: [50, 200],
        y: 200,
        radius: 50
    });
    list.addCircle({
        x: 200,
        y: 50,
        radius: 50,
        fillStyle: "red"
    });
    list.addCircle({
        x: 200,
        y: 350,
        radius: 50,
        fillStyle: "blue"
    });
    list.addCircle({
        y: 200,
        x: 350,
        radius: 50,
        fillStyle: "orange"
    });



    // scene 1, create same circles, animate #2
    list.setCurrentScene(1);
    list.addCircle({
        x: 50,
        y: 200,
        radius: 50
    });
    list.addCircle({
        x: 200,
        y: [50, 200],
        radius: 50,
        fillStyle: "red"
    });
    list.addCircle({
        x: 200,
        y: 350,
        radius: 50,
        fillStyle: "blue"
    });
    list.addCircle({
        y: 200,
        x: 350,
        radius: 50,
        fillStyle: "orange"
    });



    // animate 3rd circle
    list.setCurrentScene(2);
    list.addCircle({
        x: 50,
        y: 200,
        radius: 50
    });
    list.addCircle({
        x: 200,
        y: 50,
        radius: 50,
        fillStyle: "red"
    });
    list.addCircle({
        x: 200,
        y: [350, 200],
        radius: 50,
        fillStyle: "blue"
    });
    list.addCircle({
        y: 200,
        x: 350,
        radius: 50,
        fillStyle: "orange"
    });



    // and the fourth
    list.setCurrentScene(3);
    list.addCircle({
        x: 50,
        y: 200,
        radius: 50
    });
    list.addCircle({
        x: 200,
        y: 50,
        radius: 50,
        fillStyle: "red"
    });
    list.addCircle({
        x: 200,
        y: 350,
        radius: 50,
        fillStyle: "blue"
    });
    list.addCircle({
        y: 200,
        x: [350, 200],
        radius: 50,
        fillStyle: "orange"
    });



}