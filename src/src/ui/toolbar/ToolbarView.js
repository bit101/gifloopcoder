define(function(require) {

    var UIUtil = require("utils/UIUtil"),
        div = null,
        callbacks = null,
        buttons = null;

    function init() {
        div = UIUtil.createDiv("toolbar", document.getElementById("content"));
        callbacks = {};
        buttons = {};
        setKeyHandlers();
    }

    function addButton(id, img, text, callback) {
        var btn = UIUtil.createDiv("toolbar_button", div);
        btn.innerHTML = "<img src='" + img + "'><br/>" + text;
        btn.addEventListener("click", callback);
        buttons[id] = btn;
    }

    function setKey(key, event, callback) {
        callbacks[key] = {
            callback: callback,
            event: event
        };
    }

    function addSeparator() {
        UIUtil.createDiv("toolbar_separator", div);
    }

    function setKeyHandlers() {
        document.body.addEventListener("keyup", function(event) {
            if(event.ctrlKey && callbacks[event.keyCode]) {
                if(callbacks[event.keyCode].event == "keyup") {
                    callbacks[event.keyCode].callback();
                }
                event.preventDefault();
            }
        });
        document.body.addEventListener("keydown", function(event) {
            if(event.ctrlKey && callbacks[event.keyCode]) {
                if(callbacks[event.keyCode].event == "keydown") {
                    callbacks[event.keyCode].callback();
                }
                event.preventDefault();
            }
        });
    };

    function enableBtn(id) {
        buttons[id].className = "toolbar_button";
    }

    function disableBtn(id) {
        buttons[id].className = "toolbar_button disabled";
    }

    function setDirty(dirty) {
        if(glcConfig.isStandalone && buttons["save_btn"]) {
            if(dirty) {
                buttons["save_btn"].className = "toolbar_button dirty";
            }
            else {
                buttons["save_btn"].className = "toolbar_button";
            }
        }
    }


    return {
        init: init,
        addButton: addButton,
        addSeparator: addSeparator,
        enableBtn: enableBtn,
        disableBtn: disableBtn,
        setKey: setKey,
        setDirty: setDirty
    }

});