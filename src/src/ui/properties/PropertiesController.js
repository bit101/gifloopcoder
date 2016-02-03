define(function(require) {

    var PropertiesView = require("ui/properties/PropertiesView"),
        MainController = null,
        SnippetMap = null,
        duration = 2,
        fps = 30,
        maxColors = 256,
        mode = "bounce",
        easing = true;

    function init(pMainController, pSnippetMap) {
        MainController = pMainController;
        SnippetMap = pSnippetMap;
        PropertiesView.init(this, SnippetMap);
    }

    function onDurationChange(pDuration) {
        duration = pDuration;
        MainController.setDuration(duration);
    }

    function onFPSChange(pFps) {
        fps = pFps;
        MainController.setFPS(fps);
    }

    function onMaxColorsChange(pMaxColors) {
        maxColors = pMaxColors;
        MainController.setMaxColors(maxColors);
    }

    function onModeChange(pMode) {
        mode = pMode;
        MainController.setMode(mode);
    }

    function onEasingChange(pEasing) {
        easing = pEasing;
        MainController.setEasing(easing);
    }

    function onSnippet(snippet) {
        MainController.onSnippet(snippet);
    }

    function setDuration(pDuration) {
        if(duration !== pDuration) {
            duration = pDuration;
            PropertiesView.setDuration(duration);
        }
    }

    function getDuration() {
        return duration;
    }

    function setFPS(pFps) {
        if(fps !== pFps) {
            fps = pFps;
            PropertiesView.setFPS(fps);
        }
    }

    function getFPS() {
        return fps;
    }

    function setMaxColors(pMaxColors) {
        if(maxColors !== pMaxColors) {
            maxColors = pMaxColors;
            PropertiesView.setMaxColors(maxColors);
        }
    }

    function setMode(pMode) {
        if(mode !== pMode) {
            mode = pMode;
            PropertiesView.setMode(mode);        
        }
    }

    function setEasing(pEasing) {
        if(easing !== pEasing) {
            easing = pEasing;
            PropertiesView.setEasing(easing);        
        }
    }

    function setStatus(status) {
        PropertiesView.setStatus(status);
    }

    function disable() {
        PropertiesView.disable();
    }

    function enable() {
        PropertiesView.enable();
    }

    return {
        init: init,
        onDurationChange: onDurationChange,
        onFPSChange: onFPSChange,
        onMaxColorsChange: onMaxColorsChange,
        onModeChange: onModeChange,
        onEasingChange: onEasingChange,
        onSnippet: onSnippet,
        setDuration: setDuration,
        getDuration: getDuration,
        setFPS: setFPS,
        getFPS: getFPS,
        setMaxColors: setMaxColors,
        setMode: setMode,
        setEasing: setEasing,
        setStatus: setStatus,
        disable: disable,
        enable: enable
    };

});