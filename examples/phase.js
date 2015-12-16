function onGLC(glc) {
    glc.loop();
    glc.size(600, 200);
    // glc.setDuration(5);
    // glc.setFPS(20);
    // glc.setMode("single");
    // glc.setEasing(false);
    // glc.setMaxColors(256);
    var list = glc.renderList,
        width = glc.w,
        height = glc.h;

    var phase = 0;

    for(var x = 20; x < 600; x += 20 ) {
        list.addRect({
            x: x,
            y: [50, 150],
            w: 50,
            h: 50,
            stroke: true,
            fillStyle: "white",
            rotation: [0, 180],
            phase: phase += 0.01
        })
    }


}