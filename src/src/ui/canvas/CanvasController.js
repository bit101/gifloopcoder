define(function(require) {
    
    var CanvasView = require("ui/canvas/CanvasView"),
        MainController = null;

    function init(pMainController) {
        MainController = pMainController;
        CanvasView.init(this);
    }


    function getView() {
        return CanvasView;
    }

    function setCanvasSize(w, h) {
        CanvasView.setCanvasSize(w, h);
    }

    function setTime(t) {
        CanvasView.setTime(t);
    }

    function getCanvas() {
        return CanvasView.getCanvas();
    }

    function getContext() {
        return CanvasView.getContext();
    }

    function disableScrubber() {
        CanvasView.disableScrubber();
    }

    function enableScrubber() {
        CanvasView.enableScrubber();
    }

    function onScrub(time) {
        MainController.onRender(time);
    }

    function getStill() {
        return this.getCanvas().toDataURL();
    }

    return {
        init: init,
        getView: getView,
        setCanvasSize: setCanvasSize,
        setTime: setTime,
        getCanvas: getCanvas,
        getContext: getContext,
        disableScrubber: disableScrubber,
        enableScrubber: enableScrubber,
        onScrub: onScrub,
        getStill: getStill
    };
});