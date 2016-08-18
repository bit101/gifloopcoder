define(function(require) {

    var CodeView = require("ui/code/CodeView"),
        UIUtil = require("utils/UIUtil"),
        SnippetMap = null,
        fileInput = null,
        filename = "",
        filePath = localStorage.getItem("glcFilePath"),
        GLCInterface = null,
        MainController = null,
        isDirty = localStorage.getItem("glcIsDirty", "false") === "true";


    function init(pGLCInterface, pMainController, pSnippetMap) {
        GLCInterface = pGLCInterface;
        MainController = pMainController;
        SnippetMap = pSnippetMap;
        CodeView.init(this);
        setUpFileInput();
        setTitleWithPath();
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
        if(ignoreChanges === true || !isDirty || window.confirm("Any unsaved changes will be lost. Create new file?")) {
            if(glcConfig.isStandalone) {
                loadTemplate();
            }
            else {
                CodeView.newFile();
            }
            MainController.reset();
            setFilePath(null),
            setDirty(true);
        }
    }

    function loadTemplate() {
        var fs = nodeRequire("fs");
        fs.readFile(__dirname + "/config/template.js", function(err, data) {
            CodeView.setCode(data.toString());
        });
    }

    function open() {
        if(!isDirty || window.confirm("Any unsaved changes will be lost. Open new file?")) {
            if(glcConfig.isStandalone) {
                openNative();
            }
            else {
                fileInput.click();
            }
        }
    }

    function openNative() {
        var remote = nodeRequire("remote"),
            dialog = remote.require("dialog"),
            options = {
                filters: [
                    {
                        name: "GLC Source Files", 
                        extensions: ["js", "glc"]
                    }
                ]
            }; 
            
        dialog.showOpenDialog(options, onOpenFileChosen);
    }

    function onOpenFileChosen(files) {
        if(files && files.length > 0) {
            var fs = nodeRequire("fs");
            setFilePath(files[0]);
            fs.readFile(filePath, function(err, data) {
                CodeView.setCode(data.toString());
                setDirty(false);
            });
        }
    }

    function save() {
        if(glcConfig.isStandalone) {
            saveNative();
        }
        else {
            saveWeb();
        }
    }

    function saveNative() {
        if(filePath == null || filePath === "" || filePath === "null") {
            saveAs();
        }
        else {
            var fs = nodeRequire("fs");
            fs.writeFile(filePath, CodeView.getCode(), function(err) {
                if(err) {
                    alert(err);
                }
                else {
                    setDirty(false);
                }
            });
        }
    }

    function saveWeb() {
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
        var remote = nodeRequire("remote"),
            dialog = remote.require("dialog"),
            options = {
                filters: [
                    {
                        name: "GLC Source Files", 
                        extensions: ["js", "glc"]
                    }
                ]
            }; 
            
        dialog.showSaveDialog(options, onSaveFileChosen);
    }

    function onSaveFileChosen(file) {
        if(file) {
            setFilePath(file);
            saveNative();
        }
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

    function setCodeFromCache(code) {
        CodeView.setCode(code, true);
    }

    function onSnippet(snippetName) {
        CodeView.insertCode(SnippetMap.getSnippet(snippetName));
    }

    function setDirty(dirty) {
        isDirty = dirty;
        MainController.setDirty(isDirty);
        localStorage.setItem("glcIsDirty", isDirty ? "true" : "false");
    }

    function getDirty() {
        return isDirty;
    }

    function setFilePath(path) {
        filePath = path;
        localStorage.setItem("glcFilePath", filePath);
        setTitleWithPath();
    }

    function setTitleWithPath() {
        if(glcConfig.isStandalone) {
            var electron = nodeRequire("electron");
            if(filePath == null || filePath === "" || filePath === "null") {
                electron.remote.getCurrentWindow().setTitle("GIF Loop Coder");
            }
            else {
                electron.remote.getCurrentWindow().setTitle("GIF Loop Coder - " + filePath);
            }
        }
    }


    return {
        init: init,
        newFile: newFile,
        open: open,
        save: save,
        saveAs: saveAs,
        compile: compile,
        getView: getView,
        setCodeFromCache: setCodeFromCache,
        onSnippet: onSnippet,
        setDirty: setDirty,
        getDirty: getDirty
    };

});