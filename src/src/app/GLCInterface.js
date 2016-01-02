define(function(require) {

    function init(MainController, Styles, RenderList) {
        this.loop = MainController.loop;
        this.playOnce = MainController.playOnce;
        this.size = MainController.setSize;
        this.setDuration = MainController.setDuration;
        this.setFPS = MainController.setFPS;
        this.setMaxColors = MainController.setMaxColors;
        this.setMode = MainController.setMode;
        this.setEasing = MainController.setEasing;
        this.setQuality = MainController.setQuality;
        this.styles = Styles;
        this.renderList = RenderList;
        this.init = null;
    }


    return {
        loop: null,
        playOnce: null,
        size: null,
        setDuration: null,
        setFPS: null,
        setMode: null,
        setEasing: null,
        setMaxColors: null,
        setQuality: null,
        color: require("app/render/Color"),
        styles: null,
        renderList: null,
        w: glcConfig.canvasWidth,
        h: glcConfig.canvasHeight,
        canvas: null,
        context: null,
        init: init
    }


});