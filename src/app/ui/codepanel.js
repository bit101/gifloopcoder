require.config({
  packages: [{
    name: "codemirror",
    location: "../libs/codemirror",
    main: "lib/codemirror"
  }]
});

define([
    "libs/quicksettings", 
    "libs/codemirror/lib/codemirror", 
    "libs/codemirror/mode/javascript/javascript",
    "libs/codemirror/addon/edit/closebrackets"
    ], function(QuickSettings, CodeMirror) {
    var codePanel = null,
        cm = null,
        controller = null,
        filename = "";

    function init(pController) {
        controller = pController
        createPanel();
    }

    function createPanel() {
        cm = CodeMirror(document.body, {
            mode: "javascript",
            smartIndent: true,
            indentUnit: 4,
            lineNumbers: true,
            autoCloseBrackets: true
        });
        // cm.setSize(window.innerWidth, window.innerHeight - 56);
        cm.setValue("function onGLC(glc) {\n    glc.loop();\n    // glc.size(400, 400);\n    // glc.setDuration(5);\n    // glc.setFPS(20);\n    // glc.setMode('single');\n    // glc.setEasing(false);\n    var list = glc.renderList,\n        width = glc.w,\n        height = glc.h,\n        color = glc.color;\n\n    // your code goes here:\n\n\n\n}\n");
    }

    function saveCode() {
        var result = window.prompt("Please enter a file name. File will be saved in current browser download location.", filename);
        if(result) {
            filename = result;
            if(filename.split(".").length < 2) {
                filename += ".js";
            }
            var link = document.createElement("a");
            link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(cm.getValue()));
            link.setAttribute('download', filename);
            link.click();
        }
        else if(result === "") {
            window.alert("No file name entered. File not saved.");
        }
    }


    function setCode(code) {
        cm.setValue(code);
    }

    function getCode() {
        return cm.getValue();
    }

    return {
        saveCode: saveCode,
        setCode: setCode,
        getCode: getCode,
        init: init
    };
});