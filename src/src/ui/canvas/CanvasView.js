define(function(require) {
    
    var UIUtil = require("utils/UIUtil"),
        listener = null,
        div = null,
        canvas = null,
        context = null,
        scrubberLabel = null,
        scrubber = null;

    function init(pListener) {
        listener = pListener;
        div = UIUtil.createDiv("canvas_panel", document.getElementById("content"));
        var scrubberDiv = UIUtil.createDiv("scrubber_div", div);
        scrubberLabel = UIUtil.createDiv("control_label", scrubberDiv);
        scrubberLabel.innerHTML = "Position: 0";
        scrubber = UIUtil.createInput("range", "slider", scrubberDiv, null, "input", onScrub);
        scrubber.min = 0;
        scrubber.max = 1;
        scrubber.step = 0.01;
        scrubber.value = 0;


        canvas = UIUtil.createCanvas(null, div);
        canvas.width = glcConfig.canvasWidth;
        canvas.height = glcConfig.canvasHeight;
        if(!glcConfig.canvasCanScale) {
            canvas.style.width = (canvas.width / window.devicePixelRatio) + "px";
            canvas.style.height = (canvas.height / window.devicePixelRatio) + "px";
        }
        context = canvas.getContext("2d");
    }

    function onScrub() {
        setScrubberLabel();
        listener.onScrub(Number(scrubber.value));
    }

    function setScrubberLabel() {
        scrubberLabel.innerHTML = "Position: " + scrubber.value;
    }

    function setX(x) {
        div.style.left = x + "px";        
    }

    function setCanvasSize(w, h) {
        canvas.width = w;
        canvas.height = h;
    }

    function getCanvas() {
        return canvas;
    }

    function getContext() {
        return context;
    }

    function setTime(t) {
        scrubber.value = t;
        setScrubberLabel();
    }

    function disableScrubber() {
        scrubber.disabled = true;
    }

    function enableScrubber() {
        scrubber.disabled = false;

    }


    return {
        init: init,
        setX: setX,
        setCanvasSize: setCanvasSize,
        getCanvas: getCanvas,
        getContext: getContext,
        setTime: setTime,
        disableScrubber: disableScrubber,
        enableScrubber: enableScrubber
    }

});