define(["libs/quicksettings"], function(QuickSettings) {
	var outputPanel = null,
		model = null,
		controller = null;


	// controls
	var captureImage = "Capture",
		sizeInfo = "size",
		clearImageButton = "Clear Image";

	function init(pModel, pController) {
		model = pModel;
		controller = pController;
		outputPanel = QuickSettings.create(model.w + 220, 20, "Output");
		outputPanel.setWidth(model.w + 12);
		outputPanel.addImage(captureImage, "");
		outputPanel.addInfo(sizeInfo, "");
		outputPanel.addButton(clearImageButton, controller.clearOutput);
	}


	function setGIF(binaryGIF) {
		var dataURL = "data:image/gif;base64," + encode64(binaryGIF);
		outputPanel.setImageURL(captureImage, dataURL);
		var header = 'data:image/gif;base64,',
			imgFileSize = Math.round((dataURL.length - header.length) * 3 / 4);
		outputPanel.setInfo(sizeInfo, "Approx size: " + Math.round(imgFileSize / 1024) + "kb");
	}

	function setPNG(dataURL) {
		outputPanel.setImageURL(captureImage, dataURL);
		var header = 'data:image/png;base64,',
			imgFileSize = Math.round((dataURL.length - header.length) * 3 / 4);
		outputPanel.setInfo(sizeInfo, "Approx size: " + Math.round(imgFileSize / 1024) + "kb");
	}

	function setWidth(width) {
		outputPanel.setWidth(width);
	}

	function setPosition(x, y) {
		outputPanel.setPosition(x, y);
	}

	function clearOutput() {
		outputPanel.setImageURL(captureImage, "");
		outputPanel.setInfo(sizeInfo, "");
		outputPanel.setWidth(model.w + 12);
	}

	function encode64(input) {
		var output = "", i = 0, l = input.length,
		key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", 
		chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		while (i < l) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			}
			else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4);
		}
		return output;
	}


	return {
		init: init,
		setGIF: setGIF,
		setPNG: setPNG,
		setWidth: setWidth,
		setPosition: setPosition,
		clearOutput: clearOutput
	}
});