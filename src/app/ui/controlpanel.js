define(["libs/quicksettings"], function(QuickSettings) {
	var panel = null,
		model,
		controller,
		fileInput = null;

	// controls:
	var 
		modeDropDown = "mode",
		durationSlider = "duration",
		fpsSlider = "fps",
		maxColorsSlider = "Max Colors",
		easingCheckbox = "easing",
		statusInfo = "status";
		// fullScreen = "Full Screen";


	function init(pModel, pController) {
		model = pModel;
		controller = pController;
		panel = QuickSettings.create(window.innerWidth - 200, 60, "Control Panel");

		// electron only.
		// if(window.nodeRequire) {
		// 	var remote = nodeRequire("remote");
		// 	if(remote) {
		// 		panel.addButton(fullScreen, function() {
		// 			var win = remote.getCurrentWindow();
		// 			if(win.isFullScreen()) {
		// 				win.setFullScreen(false);
		// 			}
		// 			else {
		// 				win.setFullScreen(true);
		// 			}

		// 		})
		// 	}
		// }

		panel.addRange(durationSlider, 0.5, 10, model.getDuration(), 0.5, model.setDuration);
		panel.addRange(fpsSlider, 1, 60, model.getFPS(), 1, model.setFPS);
		panel.addRange(maxColorsSlider, 2, 256, model.maxColors, 1, function(value) {
			model.maxColors = value;
		});
		panel.bindDropDown(modeDropDown, ["bounce", "single"], model.interpolation);
		panel.bindBoolean(easingCheckbox, model.interpolation.easing, model.interpolation);
		panel.addInfo(statusInfo, "stopped");
	}

	function setStatus(status) {
		panel.setInfo(statusInfo, status);
	}

	function setFPS(value) {
		panel.setRangeValue(fpsSlider, value);
	}

	function setDuration(value) {
		panel.setRangeValue(durationSlider, value);
	}

	function setMode(mode) {
		panel.setDropDownIndex(modeDropDown, mode === "bounce" ? 0 : 1);
	}

	function setEasing(value) {
		panel.setBoolean(easingCheckbox, value);
	}

	function setMaxColors(value) {
		value = Math.max(2, value);
		value = Math.min(256, value);
		panel.setRangeValue(maxColorsSlider, value);
	}

	return {
		init: init,
		setStatus: setStatus,
		setFPS: setFPS,
		setDuration: setDuration,
		setMode: setMode,
		setEasing: setEasing,
		setMaxColors: setMaxColors,
	};

});
