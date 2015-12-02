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

    for(var a = 0; a < 360; a += 30) {
        list.addRay({
            x: width / 2,
            y: height / 2,
            angle: a,
            length: [0, glc.w / 2],
            phase: a / 360
        })
    }

}       