define(function(require) {
    // window.localStorage.clear();

    // This module creates all the controllers and other modules and sets up their relationships

    var CodeController = null,
        SplitterController = null,
        CanvasController = require("ui/canvas/CanvasController"), 
        PropertiesController = require("ui/properties/PropertiesController"),
        MainController = require("app/MainController"),
        OutputController = require("ui/output/OutputController"),
        RenderList = require("app/render/RenderList"),
        Styles = require("app/render/Styles"),
        Interpolation = require("app/render/Interpolation"),
        GLCInterface = require("app/GLCInterface"),
        SnippetMap = require("utils/SnippetMap");

    init();

    function init() {
        window.addEventListener("error", function (event) {
            window.alert(event.message + "\nLine: " + event.lineno + "\nColumn: " + event.colno);
        });
        OutputController.init();
        GLCInterface.init(MainController, Styles, RenderList);
        CanvasController.init(MainController);
        GLCInterface.canvas = CanvasController.getCanvas();
        GLCInterface.context = GLCInterface.canvas.getContext("2d");
        RenderList.init(GLCInterface, Styles, Interpolation, CanvasController.getCanvas());
        PropertiesController.init(MainController, SnippetMap);
        if(glcConfig.externalEditor) {
            CanvasController.getView().setX(0);
        }
        else {
            CodeController = require("ui/code/CodeController"),
            CodeController.init(GLCInterface, MainController, SnippetMap);
            SplitterController = require("ui/splitter/SplitterController"),
            SplitterController.init(CodeController.getView(), CanvasController.getView());
        }
        MainController.init(CodeController, 
                            CanvasController, 
                            PropertiesController, 
                            OutputController, 
                            RenderList, 
                            GLCInterface, 
                            Interpolation);
    }


});