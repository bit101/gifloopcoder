define(function(require) {

    var SplitterView = require("ui/splitter/SplitterView"),
        CodeView = null,
        CanvasView = null;

    function init(pCodeView, pCanvasView) {
        CodeView = pCodeView;
        CanvasView = pCanvasView;
        SplitterView.init(onSplitterMove);
    }

    function onSplitterMove(x) {
        x = Math.min(x, window.innerWidth - 184);
        x = Math.max(x, 30);
        CodeView.setWidth(x);
        SplitterView.setX(x);
        CanvasView.setX(x + SplitterView.getWidth());
    }

    return {
        init: init,
    };
});