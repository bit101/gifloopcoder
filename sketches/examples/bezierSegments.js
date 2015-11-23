function onGLC(glc) {
    
    glc.size(540,540);
    glc.setFPS(45);
    glc.setDuration(2.5);
    glc.styles.backgroundColor = "#74677A" // "black";
    glc.loop();
    
    var list = glc.renderList,
        width = glc.w,
        height = glc.h;

    // your code goes here:


    
    var list = glc.renderList;
    var num = 50;

    for (var i=0; i<num; i++) {
        list.addBezierSegment({
            strokeStyle: "rgba(255, 255,255,.9)",
            lineWidth: 1,
            x0: 50+i*5,
            y0: [50,100],
            x1: 510,
            y1: [164,200],
            x2: 9,
            y2: 296,
            x3: [150,500],
            y3: 400+i*2,
            percent: 1.0/num*i
        });
    }

}       