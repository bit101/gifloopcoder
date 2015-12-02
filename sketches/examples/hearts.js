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

    function randomPink() {
        var red = (Math.floor(Math.random() * 56) + 200).toString(16),
            greenBlue = (Math.floor(Math.random() * 56) + 130).toString(16);
        return "#" + red + greenBlue + greenBlue;
    }


    for(var x = 0; x <= width; x += 40) {
        list.addHeart({
            x: x,
            w: Math.random() * 50 + 20,
            h: Math.random() * 50 + 20,
            y: [height / 2 + 50, height / 2 - 50],
            fillStyle: randomPink(),
            phase: x / width
        })
    }

}       