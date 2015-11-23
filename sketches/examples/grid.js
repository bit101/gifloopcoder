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

    // your code goes here:

    list.addGrid({
        x: 0,
        y: 0,
        w: width,
        h: height,
        lineWidth: 1,
        gridSize: [20, 30]
    })


}       