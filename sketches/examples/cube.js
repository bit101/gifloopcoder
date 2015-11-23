function onGLC(glc) {
    glc.loop();
    glc.size(600, 150);
    // glc.setDuration(5);
    // glc.setFPS(20);
    glc.setMode("single");
    glc.setEasing(false);
    var list = glc.renderList,
        width = glc.w,
        height = glc.h;

    var size = 150;

    list.addCube({
        translationX: 0,
        x: size / 2,
        y: size / 2,
        size: size / 2,
        rotationX: [0, 90],
    });

    list.addCube({
        translationX: size,
        x: size / 2,
        y: size / 2,
        size: size / 2,
        rotationY: [0, -90],
    });

    list.addCube({
        translationX: size * 2,
        x: size / 2,
        y: size / 2,
        size: size / 2,
        rotationZ: [90, 0]
    });

    list.addCube({
        translationX: size * 3,
        x: size / 2,
        y: size / 2,
        size: size / 2,
        rotationX: [0, 90],
        rotationY: [0, -90],
        rotationZ: [90, 0]
    });



}       