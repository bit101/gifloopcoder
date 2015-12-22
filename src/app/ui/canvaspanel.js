define(["libs/quicksettings"], function(QuickSettings) {
	var canvasPanel = null,
		model = null,
		controller = null,
		scheduler;


	function init(pModel, pController, pScheduler, canvas) {
		var canvasPanelX = localStorage.getItem("canvasPanelX"),
			canvasPanelY = localStorage.getItem("canvasPanelY");
		if(canvasPanelX == null) canvasPanelX = 400;
		if(canvasPanelY == null) canvasPanelY = 60;

		model = pModel;
		controller = pController;
		scheduler = pScheduler;
		canvasPanel = QuickSettings.create(canvasPanelX, canvasPanelY, "Canvas Panel");
		canvasPanel.setWidth(model.w + 12);
		canvasPanel.addElement("Canvas", canvas);
		canvasPanel.addRange("Scrub", 0, 1, 0, 0.01, onScrub);
		canvasPanel.setMoveListener(function(x, y) {
			localStorage.setItem("canvasPanelX", x);
			localStorage.setItem("canvasPanelY", y);
		});
	}

	function onScrub(value) {
		if(!scheduler.isRunning()) {
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

	function hide() {
		canvasPanel.hide();
	}

	function show() {
		canvasPanel.show();
	}

	return {
		init: init,
		setWidth: setWidth,
		setTime: setTime,
		disableControls: disableControls,
		enableControls: enableControls,
		hide: hide,
		show: show
	}
});