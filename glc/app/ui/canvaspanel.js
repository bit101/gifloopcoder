define(["libs/quicksettings"], function(QuickSettings) {
	var canvasPanel = null,
		model = null,
		controller = null;


	function init(pModel, pController, canvas) {
		model = pModel;
		controller = pController;
		canvasPanel = QuickSettings.create(20, 20, "Canvas Panel");
		canvasPanel.setWidth(model.w + 12);
		canvasPanel.addElement("Canvas", canvas);
		canvasPanel.addRange("Scrub", 0, 1, 0, 0.01, onScrub);
	}

	function onScrub(value) {
		if(!model.getIsRunning()) {
			controller.renderFrame(value);
		}
	}

	function setWidth(width) {
		canvasPanel.setWidth(width);
	}

	function setTime(t) {
		canvasPanel.setRangeValue("Scrub", t);
	}

	function disableControls() {
		canvasPanel.disableControl("Scrub");
	}

	function enableControls() {
		canvasPanel.enableControl("Scrub");
	}

	return {
		init: init,
		setWidth: setWidth,
		setTime: setTime,
		disableControls: disableControls,
		enableControls: enableControls
	}
});