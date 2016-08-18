function onGLC(glc) {
    glc.loop();
    var list = glc.renderList,
        width = glc.w,
        height = glc.h,
        color = glc.color;

    var text = ["gif", "loop", "coder"];

    for(var i = 0; i < text.length; i++) {
        var t = text[i];

        list.addText({
            x: [0, width],
            y: height / text.length * (i + 0.5),
            globalAlpha: [0, 1],
            phase: i / text.length,
            fontSize: 150,
            text: text[i]
        })
    }



}