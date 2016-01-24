define(function(require) {
    var OutputView = require("ui/output/OutputView"),
        dataURL = null;

    function init() {
        OutputView.init();
        OutputView.setOnSaveImage(onSaveImage);
    }

    function onSaveImage() {
        if(glcConfig.isStandalone) {
            var remote = nodeRequire("remote"),
                dialog = remote.require("dialog"),
                type = dataURL.substr(11, 3),
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
    }

    function onFileChosen(fileName) {
        if(fileName === undefined) return;


        var header = 'data:image/xxx;base64,',
            fs = nodeRequire("fs"),
            body = dataURL.substr(header.length),
            buffer = new Buffer(body, "base64");

        fs.writeFile(fileName, buffer, "base64", function(err) {
            if(err) {
                alert("error: " + err);
            }
        });
    }


    function setImage(pDataURL, w, h) {
        dataURL = pDataURL;
        OutputView.setImage(dataURL, w, h);
    }

    return {
        init: init,
        setImage: setImage
    }


});
