define([
	"app/renderlist", 
	"app/scheduler", 
	"app/styles",
	"app/interpolation",
	"libs/quicksettings",
	"libs/GIFEncoder",
	"libs/color"],
	
function(
	renderList, 
	scheduler, 
	styles,
	interpolation,
	QuickSettings,
	GIFEncoder,
	color) {

	var panel,
		canvasPanel,
		outputPanel,
		downloadLink,
		infoPanel,
		creditsPanel,
		capture = false,
		w = 400,
		h = 400,
		maxColors = 256;


	function init() {
		loadCSS();
		renderList.init(w, h, styles, interpolation);
		scheduler.init(onRender, onComplete);
		createControlPanel();
		createCanvasPanel();
		createOutputPanel();
		createInfoPanel();
		createCreditsPanel();
		setCallbacks();
	}

	function size(width, height) {
		this.w = w = width;
		this.h = h = height;
		renderList.size(w, h);
		canvasPanel.setWidth(w + 12);
		outputPanel.setWidth(w + 12);
		panel.setPosition(w + 50, 20);
		infoPanel.setPosition(w + 50, 350);
		outputPanel.setPosition(w + 220, 20);
	}

	function loadCSS() {
		var head = document.getElementsByTagName('head')[0],
			link = document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = require.toUrl("libs/quicksettings_minimal.css");
		head.appendChild(link);
	}

	function playOnce() {
		panel.setInfo("status", "playing");
		scheduler.playOnce();
		canvasPanel.disableControl("Scrub");
		panel.disableControl("Play Once");
		panel.disableControl("Loop");
		panel.disableControl("Make a gif");
		panel.disableControl("Capture still");
	}

	function loop() {
		panel.setInfo("status", "playing");
		scheduler.loop();
		canvasPanel.disableControl("Scrub");
		panel.disableControl("Play Once");
		panel.disableControl("Loop");
		panel.disableControl("Make a gif");
		panel.disableControl("Capture still");
	}

	function createInfoPanel() {
		infoPanel = QuickSettings.create(renderList.getCanvas().width + 50, 350, "GIF Loop Coder");
		infoPanel.addInfo("Info", "Howdy! Welcome to GIF Loop Coder (GLC). This program is offered free and is open source. Lots of hours went into it, so if you find it useful, pay it back or pay it forward.");
		infoPanel.addInfo("tips", "<a href='https://www.paypal.me/bit101'>Buy me a beer (or two)</a>");
		infoPanel.addButton("Credits", function() {
			creditsPanel.show();
		})
	}

	function createCreditsPanel() {
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

	function createCanvasPanel() {	
		canvasPanel = QuickSettings.create(20, 20, "Canvas Panel");
		canvasPanel.setWidth(renderList.getCanvas().width + 12);
		canvasPanel.addElement("Canvas", renderList.getCanvas());
		canvasPanel.addRange("Scrub", 0, 1, 0, 0.01, onScrub);
	}

	function createOutputPanel() {
		outputPanel = QuickSettings.create(renderList.getCanvas().width + 220, 20, "Output");
		outputPanel.setWidth(renderList.getCanvas().width + 12);
		outputPanel.addImage("Capture", "");
		outputPanel.addInfo("size", "");
		outputPanel.addButton("Clear Image", clear);

		downloadLink = document.createElement("div");
	}

	function onScrub(value) {
		if(!scheduler.isRunning()) {
			renderList.render(value);
		}
	}

	function createControlPanel() {
		panel = QuickSettings.create(renderList.getCanvas().width + 50, 20, "Control Panel");
		panel.addRange("duration", 0.5, 10, scheduler.getDuration(), 0.5, scheduler.setDuration);
		panel.addRange("fps", 1, 60, scheduler.getFPS(), 1, scheduler.setFPS);
		panel.addRange("Max Colors", 2, 256, maxColors, 1, function(value) {
			maxColors = value;
		});
		panel.bindDropDown("mode", ["bounce", "single"], interpolation);
		panel.bindBoolean("easing", interpolation.easing, interpolation);
		panel.addButton("Play Once", playOnce);
		panel.addButton("Loop", loop);
		panel.addButton("Stop", stop);
		panel.addButton("Make a gif", makeGif);
		panel.addButton("Capture still", captureStill);
		panel.addInfo("status", "stopped");
	}

	function setCallbacks() {
		scheduler.renderCallback = onRender;
		scheduler.completeCallback = onComplete;
	}

	function makeGif() {
		if(!scheduler.running) {
			outputPanel.removeControl("Save");
			outputPanel.setImageURL("Capture", "");
			outputPanel.setInfo("size", "");
			outputPanel.setWidth(w + 12);
			capture = true;
			GIFEncoder.setMaxColors(maxColors);
			GIFEncoder.setRepeat(0);
			GIFEncoder.setDelay(1000 / scheduler.getFPS());
			GIFEncoder.start();
			playOnce();
		}
		else {
			panel.setInfo("status", "Animation already running");
		}
	}

	function captureStill() {
		var canvas = renderList.getCanvas(),
			dataURL = canvas.toDataURL();
		outputPanel.setWidth(w + 12);
		outputPanel.setImageURL("Capture", dataURL);
		var header = 'data:image/png;base64,';
		var imgFileSize = Math.round((dataURL.length - header.length) * 3 / 4);
		outputPanel.setInfo("size", "Approx size: " + Math.round(imgFileSize / 1024) + "kb");

		// disabled save link for consistency. see note in onComplete().
		// outputPanel.removeControl("Save");
		// downloadLink.innerHTML = "<a href='" + dataURL + "' download='" + getFileName(".png") + "'>Save PNG</a>";
		// outputPanel.addElement("Save", downloadLink);
	}

	function stop() {
		panel.setInfo("status", "stopped");
		scheduler.stop();
		canvasPanel.enableControl("Scrub");
		panel.enableControl("Play Once");
		panel.enableControl("Loop");
		panel.enableControl("Make a gif");
		panel.enableControl("Capture still");
	}

	function clear() {
		outputPanel.setImageURL("Capture", "");
		outputPanel.removeControl("Save");
	}

	function onRender(t) {
		canvasPanel.setRangeValue("Scrub", t);
		renderList.render(t);
		if(capture) {
			panel.setInfo("status", "capturing...");
			GIFEncoder.addFrame(renderList.getContext());
		}
		canvasPanel.setRangeValue("Scrub", t);
		renderList.render(t);
	}

	function onComplete() {
		if(capture) {
			capture = false;
			GIFEncoder.finish();
			var binaryGIF = GIFEncoder.stream().getData();
			var dataURL = "data:image/gif;base64," + encode64(binaryGIF);
			outputPanel.setImageURL("Capture", dataURL);

			var header = 'data:image/gif;base64,';
			var imgFileSize = Math.round((dataURL.length - header.length) * 3 / 4);
			outputPanel.setInfo("size", "Approx size: " + Math.round(imgFileSize / 1024) + "kb");

			// the save link is disabled as it was failing far too often.
			// more predictable to right click and save or drag and drop image to file system.
			// enable this if you'd like, it generally works for images with fewer total frames.
			// downloadLink.innerHTML = "<a href='" + dataURL + "' download='" + getFileName(".gif") + "'>Save GIF</a>";
			// outputPanel.addElement("Save", downloadLink);
		}
		panel.setInfo("status", "stopped");
		canvasPanel.enableControl("Scrub");
		panel.enableControl("Play Once");
		panel.enableControl("Loop");
		panel.enableControl("Make a gif");
		panel.enableControl("Capture still");
	}

	function getFileName(type) {
		var date = new Date();
			year = date.getFullYear().toString().substring(2),
			month = date.getMonth() + 1,
			day = date.getDate(),
			hour = date.getHours(),
			minute = date.getMinutes(),
			second = date.getSeconds();
		if(month < 10) month = "0" + month;
		if(day < 10) day = "0" + day;
		if(hour < 10) hour = "0" + hour;
		if(minute < 10) minute = "0" + minute;
		if(second < 10) second = "0" + second;

		return "" + year + month + day + "-" + hour + minute + second + type;
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

	function setFPS(value) {
		panel.setRangeValue("fps", value);
	}

	function setDuration(value) {
		panel.setRangeValue("duration", value);
	}

	function setMode(mode) {
		panel.setDropDownIndex("mode", mode === "bounce" ? 0 : 1);
	}

	function setEasing(value) {
		panel.setBoolean("easing", value);
	}

	function setMaxColors(value) {
		value = Math.max(2, value);
		value = Math.min(256, value);
		panel.setRangeValue("Max Colors", value);
	}



	var glc =  {
		w: w,
		h: h,
		renderList: renderList,
		styles: styles,
		size: size,
		playOnce: playOnce,
		loop: loop,
		setFPS: setFPS,
		setDuration: setDuration,
		setMode: setMode,
		setEasing: setEasing,
		setMaxColors: setMaxColors,
		color: color
	};

	init();

	return glc;
});
