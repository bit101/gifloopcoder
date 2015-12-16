function onGLC(glc) {
    glc.loop();
    glc.size(400, 200);
    // glc.setDuration(5);
    // glc.setFPS(20);
    glc.setMode("single");
    // glc.setEasing(false);
    // glc.setMaxColors(256);
    var list = glc.renderList,
        width = glc.w,
        height = glc.h;


    // the key to single mode animations is the start and end positions.
    // start position of one object should match the end position of another object,
    // or the start and end states should be somehow hidden (offscreen, behind something else, or transparent)
    for(var x = -40; x < glc.w + 40; x += 80) {
        // each rect starts behind larger circle and ends fully transparent
        list.addRect({
            x: [x, x + 80],
            y: [100, 175],
            globalAlpha: [1, 0],
            w: 20,
            h: 20,
            rotation: [360, 0],
            fillStyle: "red"
        });

        // each star starts off screen and ends behind the larger circle.
        list.addStar({
            x: [x, x + 80],
            y: [-50, 100],
            innerRadius: 10,
            outerRadius: 18,
            rotation: [0, 360],
            fillStyle: "blue"
        });


        // each circle begins where the last one ends.
        // except first one which starts off screen, and last one which ends off screen
        list.addCircle({
            x: [x, x + 80],
            y: 100,
            radius: 20
        });


    }


}