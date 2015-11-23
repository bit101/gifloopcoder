function onGLC(glc) {
    glc.loop();
    glc.size(540, 540);
    glc.setFPS(45);
    glc.setDuration(3);
    glc.styles.lineWidth = 5;
    glc.styles.backgroundColor = "black";
    
    var list = glc.renderList,
        width = glc.w,
        height = glc.h;

    // your code goes here:

    var num = 50;

    for(var i = 0; i < num; i++) {
        list.addArcSegment({
            radius: [50,150],
            lineWidth: [1,8],
            strokeStyle: "rgba(255, 255, 255, 0.8)",
            x: 50+(540.0-100)/num*i,
            y: 270,
            phase: 1.0/num*i/2
        });
    }
}       