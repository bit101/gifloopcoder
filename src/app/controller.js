define(function() {
    var glc = null,
        scheduler = null,
        controlPanel = null,
        toolbar = null,
        canvasPanel = null,
        outputPanel = null,
        GIFEncoder = null,
        model = null,
        renderList = null,
        codePanel = null,
        infoPanel = null,
        spritesheet = null,
        reset = null;

    function init(internalInterface) {
        glc = internalInterface.glc;
        scheduler = internalInterface.scheduler;
        renderList = internalInterface.renderList;
        model = internalInterface.model;
        GIFEncoder = internalInterface.GIFEncoder;
        controlPanel = internalInterface.controlPanel;
        toolbar = internalInterface.toolbar;
        canvasPanel = internalInterface.canvasPanel;
        outputPanel = internalInterface.outputPanel;
        codePanel = internalInterface.codePanel;
        infoPanel = internalInterface.infoPanel;
        spritesheet = internalInterface.spritesheet;
        reset = internalInterface.reset;
    }


    function playOnce() {
        scheduler.playOnce();
        disableControls();
        controlPanel.setStatus("playing");
    }

    function loop() {
        scheduler.loop();
        disableControls();
        controlPanel.setStatus("playing");
    }

    function stop() {
        scheduler.stop();
        enableControls();
        controlPanel.setStatus("stopped");
    }

    function enableControls() {
        toolbar.enableControls();
        canvasPanel.enableControls();
    }

    function disableControls() {
        toolbar.disableControls();
        canvasPanel.disableControls();
    }

    function captureStill() {
        var canvas = renderList.getCanvas(),
            dataURL = canvas.toDataURL();
        outputPanel.setWidth(model.w + 12);
        outputPanel.setPNG(dataURL);
    }

    function startEncoder() {
        GIFEncoder.setMaxColors(model.maxColors);
        GIFEncoder.setRepeat(0);
        GIFEncoder.setDelay(1000 / scheduler.getFPS());
        GIFEncoder.start();
    }

    function chooseFile(event) {
        model.file = event.target.files[0];
        reload();
    }

    function reload() {
        if(!model.file) return;
        clearOutput();

        var reader = new FileReader();
        reader.onload = function() {
            setCode(reader.result, true);
        }
        reader.readAsText(model.file);
    }

    function updateCode() {
        setCode(codePanel.getCode(), false);
    }

    function newFile() {
        if(window.confirm("You will lose any unsaved changes.")) {
            stop();
            codePanel.newFile();
            setCode(codePanel.getCode(), false);
        }
    }

    function setCode(code, updateCodePanel) {
        renderList.clear();
        var script = document.getElementById("loaded_script");
        if(script) {
            document.head.removeChild(script);
        }

        script = document.createElement("script");
        script.id = "loaded_script";
        document.head.appendChild(script);

        script.textContent = code;
        if(updateCodePanel) {
            codePanel.setCode(code);
        }

        canvasPanel.hide();
        reset();
        if(window.onGLC) {
            setTimeout(function() {
                canvasPanel.show();
                window.onGLC(glc);
            }, 100);
        }
    }

    function makeGif() {
        if(!scheduler.isRunning()) {
            clearOutput();
            model.capture = true;
            startEncoder();
            playOnce();
        }
        else {
            controlPanel.setStatus("Animation already running");
        }
    }

    function makeSpriteSheet() {
        if(!scheduler.isRunning()) {
            clearOutput();
            model.captureSpriteSheet = true;
            initSpriteSheet();
            playOnce();
        }
        else {
            controlPanel.setStatus("Animation already running");
        }
    }

    function onRender(t) {
        canvasPanel.setTime(t);
        renderList.render(t);
        if(model.capture) {
            controlPanel.setStatus("capturing...");
            GIFEncoder.addFrame(renderList.getContext());
        }
        if(model.captureSpriteSheet) {
            spritesheet.addFrame(renderList.getCanvas());
        }
    }

    function onComplete() {
        if(model.capture) {
            model.capture = false;
            GIFEncoder.finish();
            outputPanel.setGIF(GIFEncoder.stream().getData());
        }
        if(model.captureSpriteSheet) {
            model.captureSpriteSheet = false;
            outputPanel.setWidth(spritesheet.getSpriteSheetSize() + 12);
            outputPanel.setPNG(spritesheet.getImage());
        }
        controlPanel.setStatus("stopped");
        enableControls();
    }

    function clearOutput() {
        outputPanel.clearOutput();
    }

    function renderFrame(value) {
        renderList.render(value);
    }

    function showInfoPanel() {
        infoPanel.show();
    }

    function saveCode() {
        codePanel.saveCode();
    }

    function initSpriteSheet() {
        spritesheet.init(scheduler.getFPS(), scheduler.getDuration());
    }

    function openFile() {
        toolbar.chooseFileDialog();
    }

    function size(width, height) {
        model.w = width;
        model.h = height;
        GIFEncoder.setSize(width, height);
        spritesheet.setSize(width, height);
        renderList.size(model.w, model.h);
        canvasPanel.setWidth(model.w + 12);
        outputPanel.setWidth(model.w + 12);
    }

    return {
        init: init,
        playOnce: playOnce,
        loop: loop,
        stop: stop,
        enableControls: enableControls,
        disableControls: disableControls,
        clearOutput: clearOutput,
        captureStill: captureStill,
        renderFrame: renderFrame,
        startEncoder: startEncoder,
        chooseFile: chooseFile,
        newFile: newFile,
        reload: reload,
        showInfoPanel: showInfoPanel,
        initSpriteSheet: initSpriteSheet,
        updateCode: updateCode,
        makeGif: makeGif,
        makeSpriteSheet: makeSpriteSheet,
        saveCode: saveCode,
        onComplete: onComplete,
        onRender: onRender,
        openFile: openFile,
        size: size
    };
});
