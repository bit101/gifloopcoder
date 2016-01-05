define(function(require) {

    var CodeView = require("ui/code/CodeView"),
        UIUtil = require("utils/UIUtil"),
        fileInput = null,
        filename = "",
        GLCInterface = null,
        MainController = null;


    function init(pGLCInterface, pMainController) {
        GLCInterface = pGLCInterface;
        MainController = pMainController;
        CodeView.init();
        setUpFileInput();
    }

    function setUpFileInput() {
        fileInput = UIUtil.createInput("file", null, null, null, "change", chooseFile);
    }

    function chooseFile(event) {
        // when cancelling, sometimes you get no event
        // sometimes you get an event with 0 files.
        if(event.target.files.length < 1) return;

        var file = event.target.files[0],
            reader = new FileReader();
        reader.onload = function() {
            CodeView.setCode(reader.result, true);
            compile();
        }
        reader.readAsText(file);
    }

    function newFile(ignoreChanges) {
        if(ignoreChanges === true || window.confirm("Any unsaved changes will be lost. Create new file?")) {
            CodeView.newFile();
            MainController.reset();
        }
    }

    function open() {
        fileInput.click();
    }

    function save() {
        var result = window.prompt("Please enter a file name. File will be saved in current browser download location.", filename);
        if(result) {
            filename = result;
            if(filename.split(".").length < 2) {
                filename += ".glc";
            }
            var link = document.createElement("a");
            link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(CodeView.getCode()));
            link.setAttribute('download', filename);
            link.click();
        }
        else if(result === "") {
            window.alert("No file name entered. File not saved.");
        }
    }

    function saveAs() {

    }

    function compile() {
        // TODO: reset and clear renderlist
        var script = document.getElementById("loaded_script");
        if(script) {
            document.head.removeChild(script);
        }

        script = UIUtil.createScript("loaded_script", CodeView.getCode(), document.head);


        reload();
    }

    function reload() {
        MainController.reset();
        if(window.onGLC) {
            window.onGLC(GLCInterface);
        }

    }

    function getView() {
        return CodeView;
    }

    function setCode(code) {
        CodeView.setCode(code);
    }


    return {
        init: init,
        newFile: newFile,
        open: open,
        save: save,
        saveAs: saveAs,
        compile: compile,
        getView: getView,
        setCode: setCode
    };

});