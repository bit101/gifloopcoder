define(["libs/quicksettings"], function(QuickSettings) {
	var panel = null;

	function init(model, controller) {
		var infoPanelX = localStorage.getItem("infoPanelX"),
			infoPanelY = localStorage.getItem("infoPanelY");
		if(infoPanelX == null) infoPanelX = (window.innerWidth - 150) / 2;
		if(infoPanelY == null) infoPanelY = 100;

		infoPanel = QuickSettings.create(infoPanelX, infoPanelY, "GIF Loop Coder v" + model.version);
		infoPanel.addInfo("site", "<a href='http://www.gifloopcoder.com'>http://www.gifloopcoder.com</a>");
		infoPanel.addInfo("Info", "Howdy! Welcome to GIF Loop Coder (GLC). This program is offered free and is open source. Lots of hours went into it, so if you find it useful, pay it back or pay it forward.");
		infoPanel.addInfo("tips", "<a href='https://www.paypal.me/bit101'>Buy me a beer (or two)</a>");
		infoPanel.addInfo("keys", "Keys:<br/>Ctrl-Enter - compile and run<br/>Ctrl-Space - play/pause<br/>Ctrl-O - open file<br/>Ctrl-S - save file<br/>Ctrl-G - make gif<br/>Ctrl-/ - toggle comment in code")
		infoPanel.addInfo("credits", "Credits:");
		infoPanel.addInfo("creator", "Architect, coding, design, etc.: Keith Peters, kp@bit-101.com");
		infoPanel.addInfo("testers", "Contributors: <a href='https://twitter.com/p5art'>Jerome Herr</a>, <a href='https://twitter.com/cacheflowe'>Justin Gitlin</a>, <a href='https://twitter.com/andremichelle'>Andre Michelle</a>, <a href='https://twitter.com/msurguy'>Maks Surguy</a>, <a href='https://github.com/EduardoLopes'>Eduardo Lopes</a>, <a href='https://github.com/crummy'>Malcolm Crum</a>, <a href='https://github.com/Landerson352'>Lincoln Anderson</a>");
		infoPanel.addInfo("encoder", "GIF Encoder: Kevin Weiner, Thibault Imbert, Kevin Kwok, Johan Nordberg. <a href='https://github.com/antimatter15/jsgif'>https://github.com/antimatter15/jsgif</a>");
		infoPanel.addInfo("QS", "User interface created with <a href='https://github.com/bit101/quicksettings'>QuickSettings.js</a>.");
		infoPanel.addInfo("codemirror", "Code editor: <a href='https://codemirror.net/'>https://codemirror.net/</a>");
		infoPanel.addInfo("icons", "Icons from <a href='http://ionicons.com/'>http://ionicons.com/</a>");
		infoPanel.addButton("Close", function() {
			infoPanel.hide();
		});
		infoPanel.hide();
		infoPanel.setMoveListener(function(x, y) {
			localStorage.setItem("infoPanelX", x);
			localStorage.setItem("infoPanelY", y);
		});
	}

	function show() {
		infoPanel.show();
	}

	function setPosition(x, y) {
		infoPanel.setPosition(x, y);
	}

	return {
		init: init,
		setPosition: setPosition,
		show: show
	};
});