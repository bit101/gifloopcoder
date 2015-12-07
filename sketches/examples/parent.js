function onGLC(glc) {
    glc.setDuration(5);
    glc.loop();
    var list = glc.renderList,
        width = glc.w,
        height = glc.h,
        color = glc.color;

    // Attach one shape to another to "group" them
    // They will move and rotate together
    var centerSquare = list.addRect({
        x:width/2,
        y:height/2,
        h:20,
        w:20,
        rotation:[0,360]
    });
    list.addCircle({
        parent:centerSquare,
        x:130,
        y:0,
        radius:10,
        fillStyle:"red"
    });

    // Recursively attach shapes
    var parentStick;
    for(var i=0;i<18;i++) {
        parentStick = list.addRect({
            fillStyle:"red",
            parent:parentStick,
            w:10,
            h:50,
            x:parentStick? 0 : 127,
            y:parentStick? 25 : 210,
            rotation:[0,-20]
        });
    }

}