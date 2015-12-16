function onGLC(glc) {
    glc.loop();
    // glc.size(400, 400);
    // glc.setDuration(5);
    // glc.setFPS(20);
    // glc.setMaxColors(256);
    glc.setMode("single");
    glc.setEasing(false);
    glc.styles.backgroundColor = "black";
    var list = glc.renderList,
        width = glc.w,
        height = glc.h;


    for(var i = 0; i < 100; i++) {
        list.addCircle({
            x: function(t) {
                return 200 + Math.sin(t * Math.PI * 2) * 50;
            },
            y: Math.random() * 400,
            radius: function(t) {
                return 3 + Math.sin(t * Math.PI * 2 + Math.PI / 2) * 2;
            },
            globalAlpha: function(t) {
                return 0.6 + Math.sin(t * Math.PI * 2 + Math.PI / 2) + 0.4;
            },
            phase: Math.random(),
            fillStyle: "red"
        })
    }
    for(var i = 0; i < 100; i++) {
        list.addCircle({
            x: function(t) {
                return 200 + Math.sin(t * Math.PI * 2) * 100;
            },
            y: Math.random() * 400,
            radius: function(t) {
                return 6 + Math.sin(t * Math.PI * 2 + Math.PI / 2) * 4;
            },
            globalAlpha: function(t) {
                return 0.6 + Math.sin(t * Math.PI * 2 + Math.PI / 2) + 0.4;
            },
            phase: Math.random(),
            fillStyle: "green"
        })
    }




}