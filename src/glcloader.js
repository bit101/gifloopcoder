require(["app/glc"], function(glc) {
    if(window.onGLC) {
        window.onGLC(glc);
    }
    else {
        window.glc = glc;
    }
});