define(function(require) {
    var UIUtil = require("utils/UIUtil"),
        overlay = null,
        image = null,
        imageInfo = null,
        closeButton = null,
        contentDiv = null;

    function init() {
        overlay = UIUtil.createDiv("overlay");
        image = UIUtil.createImage("output_image", overlay);
        imageInfo = UIUtil.createDiv("image_info", overlay);
        closeButton = UIUtil.createDiv("close_button", overlay);
        closeButton.innerHTML = "CLOSE (ESC)";
        contentDiv = document.getElementById("content");
    }

    function setImage(dataURL, w, h) {
        var header = 'data:image/xxx;base64,',
            imgFileSize = Math.round((dataURL.length - header.length) * 3 / 4);
        
        var info = "File size: " + Math.round(imgFileSize / 1024) + "kb<br/>";
        info += "Image size: " + w + "x" + h + "px<br/>";
        var scale = 100;
        if(h > window.innerHeight - 40) {
            scale = Math.round((window.innerHeight - 40) / h * 100);
        }
        else if(w > window.innerWidth - 40) {
            scale = Math.round((window.innerWidth - 40) / w * 100);
        }
        info += "Shown at scale: " + scale + "%<br/>";
        info += "Right click image to save.";
        

        imageInfo.innerHTML = info;
        image.src = dataURL;
        image.style.maxHeight = window.innerHeight - 40 + "px";
        image.style.maxWidth = window.innerWidth - 40 + "px";
        document.body.appendChild(overlay);
        closeButton.addEventListener("click", hide);
        document.body.addEventListener("keyup", onKeyUp);
    }

    function onKeyUp(event) {
        // escape key
        if(event.keyCode === 27) {
            hide();
        }
    }

    function hide() {
        if(overlay.parentElement) {
            overlay.parentElement.removeChild(overlay);
        }
        closeButton.removeEventListener("click", hide);
        document.body.removeEventListener("keyup", onKeyUp);
    }

    return {
        init: init,
        setImage: setImage
    }

});