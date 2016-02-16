define(function(require) {
    
    // This module routes commmands to and from other modules


    var CodeController = null, 
        CanvasController = null,
        PropertiesController = null,
        OutputController = null,
        RenderList = null,
        GLCInterface = null,
        Interpolation = null,
        Encoder = require("app/encode/Encoder"),
        SpriteSheet = require("app/encode/SpriteSheet"),
        ImageSequence = require("app/encode/ImageSequence"),
        ToolbarController = require("ui/toolbar/ToolbarController"),
        Scheduler = require("app/Scheduler"),
        AboutController = require("ui/about/AboutController");


    function init(pCodeController, pCanvasController, pPropertiesController, pOutputController, pRenderList, pGLCInterface, pInterpolation) {
        CodeController = pCodeController;
        CanvasController = pCanvasController;
        PropertiesController = pPropertiesController;
        OutputController = pOutputController;
        RenderList = pRenderList;
        GLCInterface = pGLCInterface,
        Interpolation = pInterpolation;
        ToolbarController.init(this);
        Scheduler.init(this);
        var cachedCode = localStorage.getItem("glcCode");
        if(glcConfig.externalEditor) {
            reset();
            if(window.onGLC) {
                window.onGLC(GLCInterface);
            }
        }
        else if(cachedCode == null) {
            newFile(true);
        }
        else {
            CodeController.setCodeFromCache(cachedCode);
            setDirty(CodeController.getDirty());
            compile();
        }
    }

    ////////////////////////////////////////
    // scheduler methods
    ////////////////////////////////////////

    function onStart() {
        ToolbarController.disablePlay();
        CanvasController.disableScrubber();
        PropertiesController.setStatus("running");
    }

    function onRender(t) {
        CanvasController.setTime(t);
        RenderList.render(t);
        if(Encoder.isEncoding()) {
            Encoder.addFrame(CanvasController.getContext());
        }
        else if(SpriteSheet.isEncoding()) {
            SpriteSheet.addFrame(CanvasController.getCanvas());
        }
        else if(ImageSequence.isEncoding()) {
            ImageSequence.addFrame(CanvasController.getCanvas());
        }
    }

    function onComplete() {
        ToolbarController.enablePlay();
        CanvasController.enableScrubber();
        PropertiesController.setStatus("stopped");
        PropertiesController.enable();
        if(Encoder.isEncoding()) {
            Encoder.complete();
            var dataURL = Encoder.getDataURL();
            OutputController.setImage(dataURL, GLCInterface.w, GLCInterface.h);
        }
        else if(SpriteSheet.isEncoding()) {
            SpriteSheet.complete();
            var dataURL = SpriteSheet.getDataURL();
            OutputController.setImage(dataURL, SpriteSheet.getSpriteSheetSize(), SpriteSheet.getSpriteSheetSize());
        }
        else if(ImageSequence.isEncoding()) {
            ImageSequence.complete();
        }
    }


    ////////////////////////////////////////
    // file methods
    ////////////////////////////////////////

    function newFile(ignoreChanges) {
        stop();
        CodeController.newFile(ignoreChanges);
    }

    function open() {
        CodeController.open();
    }

    function save() {
        CodeController.save();
    }

    function saveAs() {
        CodeController.saveAs();
    }

    function compile() {
        CodeController.compile();
    }

    function reset() {
        RenderList.clear();
        setDuration(2);
        setFPS(30);
        setMaxColors(256);
        setMode("bounce");
        setEasing(true);
        setQuality(10);
        setSize(glcConfig.canvasWidth, glcConfig.canvasHeight);
        GLCInterface.styles.reset();
        GLCInterface.onEnterFrame = null;
        GLCInterface.onExitFrame = null;
    }

    function setDirty(dirty) {
        ToolbarController.setDirty(dirty);
    }




    ////////////////////////////////////////
    // play methods
    ////////////////////////////////////////

    function loop() {
        Scheduler.loop();
    }

    function toggleLoop() {
        if(Scheduler.isRunning()) {
            Scheduler.stop();
        }
        else {
            Scheduler.loop();
        }
    }

    function playOnce() {
        Scheduler.playOnce();
    }

    function stop() {
        Scheduler.stop();
    }



    ////////////////////////////////////////
    // render methods
    ////////////////////////////////////////

    function makeGif() {
        PropertiesController.disable();
        Encoder.start();
        playOnce();
    }

    function captureStill() {
        stop();
        var dataURL = CanvasController.getStill();
        OutputController.setImage(dataURL, GLCInterface.w, GLCInterface.h);
    }

    function makeSpriteSheet() {
        SpriteSheet.start(PropertiesController.getFPS(), PropertiesController.getDuration(), GLCInterface.w, GLCInterface.h);
        if(SpriteSheet.isEncoding()) {
            PropertiesController.disable();
            playOnce();
        }
    }

    function makeImageSequence() {
        ImageSequence.chooseFileLocation(function() {
            ImageSequence.start();
            PropertiesController.disable();
            playOnce();
        });
    }



    ////////////////////////////////////////
    // misc methods
    ////////////////////////////////////////

    function showAbout() {
        stop();
        AboutController.show();
    }



    ////////////////////////////////////////
    // property setters
    ////////////////////////////////////////

    function setSize(w, h) {
        w = Math.round(w);
        h = Math.round(h);
        CanvasController.setCanvasSize(w, h);
        RenderList.setSize(w, h);
        Encoder.setSize(w, h);
        GLCInterface.w = w;
        GLCInterface.h = h;
    }

    function setDuration(duration) {
        Scheduler.setDuration(duration);
        PropertiesController.setDuration(duration);
    }

    function setFPS(fps) {
        Scheduler.setFPS(fps);
        PropertiesController.setFPS(fps);
        Encoder.setFPS(fps);
    }

    function setMaxColors(maxColors) {
        PropertiesController.setMaxColors(maxColors);
        Encoder.setMaxColors(maxColors);
    }

    function setMode(mode) {
        Interpolation.setMode(mode);
        PropertiesController.setMode(mode);
    }

    function setEasing(easing) {
        Interpolation.setEasing(easing);
        PropertiesController.setEasing(easing);
    }

    function setQuality(quality) {
        Encoder.setQuality(quality);
    }

    function onSnippet(snippet) {
        CodeController.onSnippet(snippet);
    }


    return {
        init: init,
        newFile: newFile,
        open: open,
        save: save,
        saveAs: saveAs,
        compile: compile,
        setDirty: setDirty,
        loop: loop,
        toggleLoop: toggleLoop,
        playOnce: playOnce,
        stop: stop,
        makeGif: makeGif,
        captureStill: captureStill,
        makeSpriteSheet: makeSpriteSheet,
        makeImageSequence: makeImageSequence,
        showAbout: showAbout,
        onStart: onStart,
        onRender: onRender,
        onComplete: onComplete,
        reset: reset,
        setSize: setSize,
        setDuration: setDuration,
        setFPS: setFPS,
        setMaxColors: setMaxColors,
        setMode: setMode,
        setEasing: setEasing,
        setQuality: setQuality,
        onSnippet: onSnippet
    }


});