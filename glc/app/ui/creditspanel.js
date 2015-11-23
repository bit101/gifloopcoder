define(["libs/quicksettings"], function(QuickSettings) {
	var creditsPanel = null;

	function init() {
		creditsPanel = QuickSettings.create(100, 100, "Credits");
		creditsPanel.addInfo("creator", "Architect, coding, design, etc.: Keith Peters, kp@bit-101.com");
		creditsPanel.addInfo("testers", "Testers: <a href='https://twitter.com/p5art'>Jerome Herr</a>, <a href='https://twitter.com/cacheflowe'>Justin Gitlin</a>, <a href='https://twitter.com/andremichelle'>André Michelle</a>");
		creditsPanel.addInfo("encoder", "GIF Encoder: Kevin Weiner, Thibault Imbert, Kevin Kwok, Johan Nordberg");
		creditsPanel.addInfo("QS", "User interface created with <a href='https://github.com/bit101/quicksettings'>QuickSettings.js</a>.");
		creditsPanel.addButton("Close", function() {
			creditsPanel.hide();
		});
		creditsPanel.hide();
	}

	function show() {
		creditsPanel.show();
	}

	return {
		init: init,
		show: show
	};

});