define(function(require) {

    var UIUtil = require("utils/UIUtil"),
        CodeMirror = require("libs/codemirror/lib/codemirror"), 
        div = null,
        cm = null,
        width = 0,
        toolbarHeight = 51;

    require("libs/codemirror/mode/javascript/javascript");
    require("libs/codemirror/addon/edit/closebrackets");
    require("libs/codemirror/addon/comment/comment");

    function init() {
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
            autoCloseBrackets: true
        });
        cm.on("change", cacheCode);
        setWidth(width);
        window.addEventListener("resize", onResize);
    }

    function cacheCode() {
        localStorage.setItem("glcCode", cm.getValue());
    }

    function newFile() {
        cm.setValue("function onGLC(glc) {\n    glc.loop();\n//     glc.size(400, 400);\n//     glc.setDuration(5);\n//     glc.setFPS(20);\n//     glc.setMode('single');\n//     glc.setEasing(false);\n    var list = glc.renderList,\n        width = glc.w,\n        height = glc.h,\n        color = glc.color;\n\n    // your code goes here:\n\n\n\n}\n");
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
            if(event.ctrlKey && event.keyCode === 191) {
                cm.toggleComment();
            }
        })
    }

    function setCode(pCode) {
        cm.setValue(pCode);
    }

    function getCode() {
        return cm.getValue();
    }


    return {
        init: init,
        setWidth: setWidth,
        setCode: setCode,
        getCode: getCode,
        newFile: newFile
    };

});