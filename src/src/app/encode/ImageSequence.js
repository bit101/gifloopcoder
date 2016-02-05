define(function() {
    var fileName = null,
        encoding = false,
        readyCallback,
        frameNum = null;

    function start() {
        encoding = true;
        frameNum = 0;
    }

    function complete() {
        encoding = false;
    }

    function addFrame(canvas) {
        var header = 'data:image/xxx;base64,',
            fs = nodeRequire("fs"),
            dataURL = canvas.toDataURL();
            body = dataURL.substr(header.length),
            buffer = new Buffer(body, "base64"),
            frameName = getFrameName();

        fs.writeFile(frameName, buffer, "base64", function(err) {
            if(err) {
                alert("error: " + err);
            }
        });
        frameNum++;
    }

    function getFrameName() {
        var frameNumStr = "" + frameNum;
        while(frameNumStr.length < 4) {
            frameNumStr = "0" + frameNumStr;
        }
        return fileName + "_" + frameNumStr + ".png";
    }

    function chooseFileLocation(callback) {
        readyCallback = callback;
        var remote = nodeRequire("remote"),
            dialog = remote.require("dialog"),
            type = "png",
            options = {
                filters: [
                    {
                        name: type, 
                        extensions: [type]
                    }
                ]
            }; 
            
        dialog.showSaveDialog(options, onFileChosen);

    }

    function onFileChosen(value) {
        if(value === undefined) return;
        fileName = value;
        if(fileName.substr(fileName.length - 4) === ".png") {
            fileName = fileName.substring(0, value.length - 4);
        }
        if(readyCallback) {
            readyCallback();
        }
    }

    function isEncoding() {
        return encoding;
    }

    return {
        start: start,
        complete: complete,
        isEncoding: isEncoding,
        addFrame: addFrame,
        chooseFileLocation: chooseFileLocation
    }


});