define(function(require) {

    var UIUtil = require("utils/UIUtil"),
        div = null,
        onSplitterMove = null,
        offset = 0;

    function init(pOnSplitterMove) {
        onSplitterMove = pOnSplitterMove;
        div = UIUtil.createDiv("splitter", document.getElementById("content"));
        width = div.offsetWidth;
        UIUtil.createDiv(null, div, { 
            width: "2px", 
            height: "20px", 
            backgroundColor: "#888888",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: (window.innerHeight / 2 - 35) + "px"

        });

        addEventListeners();
    }

    function setX(x) {
        div.style.left = x + "px";
    }

    function getWidth() {
        return width;
    }


    function addEventListeners() {
        div.addEventListener("mousedown", onMouseDown);
        window.addEventListener("resize", onWindowResize);
    }

    function onMouseDown(event) {
        offset = event.clientX - div.offsetLeft;
        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp);
    }

    function onMouseMove(event) {
        if(onSplitterMove) {
            onSplitterMove(event.clientX - offset);
        }
        event.preventDefault();
    }

    function onMouseUp(event) {
        document.body.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseup", onMouseUp);
    }

    function onWindowResize() {
        onSplitterMove(div.offsetLeft);
    }

    return {
        init: init,
        setX: setX,
        getWidth: getWidth,
    };

});