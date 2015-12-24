function onGLC(glc) {
    glc.loop();
    // glc.size(400, 400);
    glc.setDuration(5);
    // glc.setFPS(20);
    glc.setMode("single");
    glc.setEasing(false);
    // glc.setMaxColors(256);
    glc.styles.shadowColor = "rgba(0,0,0,0.4)";
    glc.styles.shadowOffsetX = 10;
    glc.styles.shadowOffsetY = 10;
    glc.styles.shadowBlur = 10;
    var list = glc.renderList,
        width = glc.w,
        height = glc.h;

    function randomGray() {
        var shade = Math.floor(Math.random() * 256).toString(16);
        return "#" + shade  + shade + shade;
    }


    for(var a = 0; a < 50; a += 1) {
        list.addGear({

            x: Math.random() * width,
            y: Math.random() * height,
            radius: 20 + Math.random() * 30,
            teeth: 5 + Math.round(Math.random() * 5),
            rotation: [0, 360],
            fillStyle: randomGray(),
            phase: Math.random()
        })
    }

}       