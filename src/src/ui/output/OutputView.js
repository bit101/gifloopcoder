define(function(require) {
    var UIUtil = require("utils/UIUtil"),
        overlay = null,
        image = null,
        imageInfo = null,
        closeButton = null,
        contentDiv = null,
        saveButton = null;


    function init() {
        overlay = UIUtil.createDiv("overlay");
        image = UIUtil.createImage("output_image", overlay);
        imageInfo = UIUtil.createDiv("image_info", overlay);
        closeButton = UIUtil.createDiv("close_button", overlay);
        closeButton.innerHTML = "CLOSE (ESC)";
        contentDiv = document.getElementById("content"),
        onSaveImage = null;

        if(glcConfig.isStandalone) {
            saveButton = UIUtil.createDiv("save_button", overlay);
            saveButton.innerHTML = "SAVE IMAGE";
            saveButton.addEventListener("click", function() {
                if(onSaveImage != null) {
                    onSaveImage();
                }
            });
        }
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
        if(!glcConfig.isStandalone) {
            info += "Right click image to save.";
        }    

        imageInfo.innerHTML = info;
        image.src = dataURL;
        image.style.maxHeight = window.innerHeight - 40 + "px";
        image.style.maxWidth = window.innerWidth - 40 + "px";
        document.body.appendChild(overlay);
        document.body.addEventListener("keyup", onKeyUp);
        closeButton.addEventListener("click", hide);
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

    function setOnSaveImage(listener) {
        onSaveImage = listener;
    }

    return {
        init: init,
        setImage: setImage,
        setOnSaveImage: setOnSaveImage
    }

});
