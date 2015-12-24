function onGLC(glc) {
    glc.loop();
    glc.size(360, 275);
//     glc.setDuration(5);
//     glc.setFPS(20);
//     glc.setMode('single');
//     glc.setEasing(false);
    var list = glc.renderList,
        width = glc.w,
        height = glc.h,
        color = glc.color;
    
    list.addIsobox({
        x: width / 2,
        y: 290,
        size: 340,
        h: 100,
        colorTop: color.hsv(45, 1, 1),
        colorRight: color.hsv(45, 1, 0.8),
        colorLeft: color.hsv(45, 1, 0.5)
    });
    
    var tileWidth = 60,
        tileHeight = tileWidth / 2;
    
    for(var y = 0; y < 5; y++) {
        for(var x = 0; x < 5; x++) {
            var xpos = width / 2 + (x - y) * tileWidth / 2,
                ypos = 130 + (x + y) * tileHeight / 2,
                hue = 30 + Math.random() * 30;
            list.addIsobox({
                x: xpos,
                y: ypos,
                size: tileWidth,
                h: [0, 100],
                phase: (x - y) / 20,
                colorTop: color.hsv(hue, 1, 1),        
                colorLeft: color.hsv(hue, 1, 0.5),
                colorRight: color.hsv(hue, 1, 0.75),
            });
        }
    }


}
