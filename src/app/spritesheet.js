define(function() {
    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        spriteSheetSize = 0,
        spriteSheetX = 0,
        spriteSheetY = 0,
        frameWidth = 0,
        frameHeight = 0;

    function setSize(width, height) {
        frameWidth = width;
        frameHeight = height;
    }

    function addFrame(frame) {
        context.drawImage(frame, spriteSheetX, spriteSheetY);
        spriteSheetX += frameWidth;
        if(spriteSheetX + frameWidth > spriteSheetSize) {
            spriteSheetX = 0;
            spriteSheetY += frameHeight;
        }
    }

    function getImage() {
        return canvas.toDataURL();
    }

    function init(fps, duration) {
        var numFrames = fps * duration,
            framesSqrt = Math.ceil(Math.sqrt(numFrames));
        spriteSheetSize = framesSqrt * Math.max(frameWidth, frameHeight);
        if(spriteSheetSize > 2048) {
            if(!confirm("Warning: Sprite sheets create a large bitmap with each frame of your animation laid out in a grid. Your sprite sheet will be " + spriteSheetSize + "x" + spriteSheetSize + ", which is pretty dang big. That OK with you?")) {
                return;
            }
        }
        canvas.width = canvas.height = spriteSheetSize;
        context.clearRect(0, 0, spriteSheetSize, spriteSheetSize);

        spriteSheetX = 0;
        spriteSheetY = 0;
    }

    function getSpriteSheetSize() {
        return spriteSheetSize;
    }




    return {
        setSize: setSize,
        addFrame: addFrame,
        getImage: getImage,
        init: init,
        getSpriteSheetSize: getSpriteSheetSize
    };


});