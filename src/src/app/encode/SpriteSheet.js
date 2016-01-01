define(function() {
    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        spriteSheetSize = 0,
        spriteSheetX = 0,
        spriteSheetY = 0,
        frameWidth = 0,
        frameHeight = 0,
        encoding = false;

    function addFrame(frame) {
        context.drawImage(frame, spriteSheetX, spriteSheetY);
        spriteSheetX += frameWidth;
        if(spriteSheetX + frameWidth > spriteSheetSize) {
            spriteSheetX = 0;
            spriteSheetY += frameHeight;
        }
    }

    function getDataURL() {
        return canvas.toDataURL();
    }

    function start(fps, duration, width, height) {
        var numFrames = fps * duration;

        frameWidth = width;
        frameHeight = height;
        var w = frameWidth * numFrames,
            h = frameHeight,
            i = 1;

        while(h <= w) {
            i++;
            w = frameWidth * Math.ceil(numFrames / i);
            h = frameHeight * i;
        } 

        i--;
        spriteSheetSize = frameWidth * Math.ceil(numFrames / i);

        if(spriteSheetSize > 2048) {
            if(!confirm("Warning: Sprite sheets create a large bitmap with each frame of your animation laid out in a grid. Your sprite sheet will be " + spriteSheetSize + "x" + spriteSheetSize + ", which is pretty dang big. That OK with you?")) {
                return;
            }
        }
        canvas.width = canvas.height = spriteSheetSize;
        context.clearRect(0, 0, spriteSheetSize, spriteSheetSize);

        spriteSheetX = 0;
        spriteSheetY = 0;
        encoding = true;
    }

    function complete() {
        encoding = false;
    }

    function getSpriteSheetSize() {
        return spriteSheetSize;
    }

    function isEncoding() {
        return encoding;
    }



    return {
        addFrame: addFrame,
        getDataURL: getDataURL,
        getSpriteSheetSize: getSpriteSheetSize,
        isEncoding: isEncoding,
        start: start,
        complete: complete
    };


});