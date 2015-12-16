function onGLC(glc) {
    
    glc.loop();
    glc.size(540,540);
    glc.setFPS(33);
    glc.setDuration(3);
    glc.styles.backgroundColor = "white"

    
    var list = glc.renderList,
       width = glc.w,
       height = glc.h;

    // your code goes here:

    var n = 6;
    var rad = (width/n)/2;
    
    for (var j=0; j<n; j++) {
        for (var i=0; i<n; i++) {
            list.addPoly({
                x: rad + i*rad*2,
                y: rad + j*rad*2,
                radius: [rad*.9, rad*.4],
                sides: [6,3],
                rotation: [0,180],
                fillStyle: ["#ffc500", "#c21500"], 
                phase: .75+ .25/(-n*n)*(i*n+j)
            });
        }
    }

}       