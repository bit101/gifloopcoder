function onGLC(glc) {
    var list = glc.renderList;

    glc.loop();
    glc.size(540, 540);
    glc.setDuration(3);
    glc.setFPS(30);
    glc.styles.backgroundColor = "#000000";

    
    // your code goes here:
    
    var num=100;
    
    for (var i=0; i<num; i++) {
        list.addRay({
            lineWidth: [1,3],
            strokeStyle: "rgba(255,255,255,.8)",
            x: [.3*glc.w,.4*glc.w],
            y: .1*glc.h + (glc.h*.7)/num*i,
            length: [i+glc.h*.4,glc.h*.2],
            angle: [10,30+.1*i],
            phase: 1.0/num*i*3
        });
    }


}       