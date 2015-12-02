function onGLC(glc) {
    var list = glc.renderList;

    glc.loop();
    glc.size(540, 540);
    glc.setDuration(3);
    glc.setFPS(30);
    
    list.addSpiral({
        x: glc.w/2,
        y: glc.h/2,
        innerRadius: [5,100],
        outerRadius: 150,
        turns: [5,12],
        res: 1,
        rotation: [0,360],
        stroke: true,
        fill: true,
        strokeWidth:[2,10],
        strokeStyle: "white",
        fillStyle: "black"
    });



}       