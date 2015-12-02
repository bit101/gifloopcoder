function onGLC(glc) {
    glc.loop();
    // glc.size(400, 400);
    glc.setDuration(5);
    // glc.setFPS(20);
    // glc.setMode("single");
    // glc.setEasing(false);
    // glc.setMaxColors(256);
    var list = glc.renderList,
        width = glc.w,
        height = glc.h;


    glc.size(400, 250);
    var list = glc.renderList;

    for(var i = 0; i < 10; i++) {
        list.addBezierSegment({
            x0: 20,
            y0: 30,
            x1: 300,
            y1: 400,
            x2: 200,
            y2: 40,
            x3: 380,
            y3: 30,
            lineWidth: 40 - i * 7.5,
            percent: i * 0.2
        });
    }

}