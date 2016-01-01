define(function(require) {
    var OutputView = require("ui/output/OutputView");

    function init() {
        OutputView.init();
    }

    function setImage(dataUrl, w, h) {
        OutputView.setImage(dataUrl, w, h);
    }

    return {
        init: init,
        setImage: setImage
    }


});