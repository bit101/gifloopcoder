define(function(require) {

    var UIUtil = require("utils/UIUtil"),
        CodeMirror = require("libs/codemirror/lib/codemirror"), 
        CodeController = null,
        div = null,
        cm = null,
        width = 0,
        toolbarHeight = 51,
        ignoreChange = false;

    require("libs/codemirror/mode/javascript/javascript");
    require("libs/codemirror/addon/edit/closebrackets");
    require("libs/codemirror/addon/comment/comment");

    function init(pCodeController) {
        CodeController = pCodeController;
        div = UIUtil.createDiv("code_panel", document.getElementById("content"));
        width = div.offsetWidth;
        createCodeMirror();
        setKeys();
    }

    function createCodeMirror() {
        cm = CodeMirror(div, {
            mode: "javascript",
            smartIndent: true,
            indentUnit: 4,
            lineNumbers: true,
            autoCloseBrackets: true,
            indentWithTabs: glcConfig.useTabs
        });
        cm.on("change", cacheCode);
        setWidth(width);
        window.addEventListener("resize", onResize);
    }

    function cacheCode() {
        localStorage.setItem("glcCode", cm.getValue());
        if(!ignoreChange) {
            CodeController.setDirty(true);
        }
        ignoreChange = false;
    }

    function newFile() {
        var template = "function onGLC(glc) {\n\tglc.loop();\n//\tglc.size(400, 400);\n//\tglc.setDuration(5);\n//\tglc.setFPS(20);\n//\tglc.setMode('single');\n//\tglc.setEasing(false);\n\tvar list = glc.renderList,\n\t\twidth = glc.w,\n\t\theight = glc.h,\n\t\tcolor = glc.color;\n\n\t// your code goes here:\n\n\n\n}\n";
        if(!glcConfig.useTabs) {
            template = template.replace(/\/\/\t/g, "//     ");
            template = template.replace(/\t/g, "    ");
        }
        cm.setValue(template);
    }

    function onResize() {
        cm.setSize(width, window.innerHeight - toolbarHeight);  
    }

    function setWidth(pWidth) {
        width = pWidth;
        div.style.width = width + "px";      
        cm.setSize(width, window.innerHeight - toolbarHeight);  
    }

    function setKeys() {
        document.body.addEventListener("keyup", function(event) {
            // console.log(event.keyCode);
            if(event.ctrlKey && event.keyCode === 191) {
                cm.toggleComment();
            }
        })
    }

    function setCode(pCode, pIgnoreChange) {
        ignoreChange = pIgnoreChange;
        cm.setValue(pCode);
    }

    function getCode() {
        return cm.getValue();
    }

    function insertCode(code) {
        cm.replaceSelection(code);
    }


    return {
        init: init,
        setWidth: setWidth,
        setCode: setCode,
        getCode: getCode,
        newFile: newFile,
        insertCode: insertCode
    };

});
