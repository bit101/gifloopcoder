// if you move your sketches folder somewhere other than the default,
// update this baseUrl property so it continues to point to the glc directory.
require.config({
    baseUrl: "../glc"
});


if(document.location.hash) {
    var script = document.createElement("script");
    script.src = document.location.hash.substring(1);
    document.head.appendChild(script);
}

window.onhashchange = function() {
    document.location.reload();
}

require(["app/glc"], function(glc) {
    if(window.onGLC) {
        window.onGLC(glc);
    }
});