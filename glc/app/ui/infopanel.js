define(["libs/quicksettings"], function(QuickSettings) {
	var panel = null;

	function init(model, controller) {
		infoPanel = QuickSettings.create(model.w + 50, 430, "GIF Loop Coder");
		infoPanel.addInfo("Info", "Howdy! Welcome to GIF Loop Coder (GLC). This program is offered free and is open source. Lots of hours went into it, so if you find it useful, pay it back or pay it forward.");
		infoPanel.addInfo("keys", "Keys:<br/>P - play/pause<br/>F - choose file<br/>R - reload file<br/>G - make gif<br/>S - capture still")
		infoPanel.addInfo("tips", "<a href='https://www.paypal.me/bit101'>Buy me a beer (or two)</a>");
		infoPanel.addButton("Credits", controller.showCredits);
	}

	function setPosition(x, y) {
		infoPanel.setPosition(x, y);
	}

	return {
		init: init,
		setPosition: setPosition
	};
});