define(function(require) {

    var GIFEncoder = require("libs/GIFEncoder"),
        encoding = false,
        maxColors = 256,
        fps = 30,
        quality = 10,
        dataURL = null,
        width = 400,
        height = 400;


    function start() {
        GIFEncoder.setSize(width, height);
        GIFEncoder.setMaxColors(maxColors);
        GIFEncoder.setRepeat(0);
        GIFEncoder.setDelay(1000 / fps);
        GIFEncoder.setQuality(quality);
        GIFEncoder.start();
        encoding = true;
    }

    function addFrame(context) {
        GIFEncoder.addFrame(context);
    }

    function complete() {
        GIFEncoder.finish();
        var data = GIFEncoder.stream().getData();
        dataURL = "data:image/gif;base64," + encode64(data);
        encoding = false;
    }

    function isEncoding() {
        return encoding;
    }

    function getDataURL() {
        return dataURL;
    }

    function setSize(w, h) {
        width = w;
        height = h;
    }

    function setMaxColors(pMaxColors) {
        maxColors = pMaxColors;
    }

    function setFPS(pFPS) {
        fps = pFPS;
    }

    function setQuality(pQuality) {
        quality = pQuality;
    }


    function encode64(input) {
        var output = "", i = 0, l = input.length,
        key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", 
        chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        while (i < l) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4);
        }
        return output;
    }


    return {
        start: start,
        addFrame: addFrame,
        complete: complete,
        isEncoding: isEncoding,
        getDataURL: getDataURL,
        setSize: setSize,
        setMaxColors: setMaxColors,
        setFPS: setFPS,
        setQuality: setQuality
    }

});