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

    list.addSpiral({
        x: width / 2,
        y: height / 2,
        innerRadius: 20,
        outerRadius: 200,
        turns: [4, 8]
    })

}       