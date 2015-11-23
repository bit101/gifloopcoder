define([
	"app/renderlist", 
	"app/scheduler", 
	"app/styles",
	"app/interpolation",
	"libs/quicksettings",
	"libs/GIFEncoder",
	"libs/color",
	"app/ui/controlpanel"],
	
function(
	renderList, 
	scheduler, 
	styles,
	interpolation,
	QuickSettings,
	GIFEncoder,
	color,
	controlPanel) {

	var canvasPanel,
		outputPanel,
		downloadLink,
		infoPanel,
		creditsPanel,
		model = {
			scheduler: scheduler,
			interpolation: interpolation,
			maxColors: 256,
			w: 400,
			h: 400,
			capture: false,
			getDuration: function() {
				return scheduler.getDuration();
			},
			setDuration: function(value) {
				scheduler.setDuration(value);
			},
			getFPS: function() {
				return scheduler.getFPS();
			},
			setFPS: function(value) {
				scheduler.setFPS(value);
			},
			getIsRunning: function() {
				return scheduler.isRunning();
			}
		},
		controller = {
			playOnce: scheduler.playOnce,
			loop: scheduler.loop,
			stop: scheduler.stop,
			enableControls: enableControls,
			disableControls: disableControls,
			clearOutput: clearOutput,
			captureStill: captureStill
		};





	function init() {
		loadCSS();
		renderList.init(model.w, model.h, styles, interpolation);
		scheduler.init(onRender, onComplete);
		createCanvasPanel();
		createOutputPanel();
		createInfoPanel();
		createCreditsPanel();
		controlPanel.init(model, controller);
		setCallbacks();
	}


	function size(width, height) {
		this.w = model.w = width;
		this.h = model.h = height;
		renderList.size(model.w, model.h);
		canvasPanel.setWidth(model.w + 12);
		outputPanel.setWidth(model.w + 12);
		controlPanel.setPosition(model.w + 50, 20);
		infoPanel.setPosition(model.w + 50, 350);
		outputPanel.setPosition(model.w + 220, 20);
	}

	function loadCSS() {
		var head = document.getElementsByTagName('head')[0],
			link = document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = require.toUrl("libs/quicksettings_minimal.css");
		head.appendChild(link);
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
		outputPanel.addButton("Clear Image", controller.clearOutput);
	}

	function onScrub(value) {
		if(!scheduler.isRunning()) {
			renderList.render(value);
		}
	}

	function setCallbacks() {
		scheduler.renderCallback = onRender;
		scheduler.completeCallback = onComplete;
	}


	function onRender(t) {
		canvasPanel.setRangeValue("Scrub", t);
		renderList.render(t);
		if(model.capture) {
			controlPanel.setStatus("capturing...");
			GIFEncoder.addFrame(renderList.getContext());
		}
		canvasPanel.setRangeValue("Scrub", t);
		renderList.render(t);
	}

	function onComplete() {
		if(model.capture) {
			model.capture = false;
			GIFEncoder.finish();
			var binaryGIF = GIFEncoder.stream().getData();
			var dataURL = "data:image/gif;base64," + encode64(binaryGIF);
			outputPanel.setImageURL("Capture", dataURL);

			var header = 'data:image/gif;base64,';
			var imgFileSize = Math.round((dataURL.length - header.length) * 3 / 4);
			outputPanel.setInfo("size", "Approx size: " + Math.round(imgFileSize / 1024) + "kb");
		}
		controlPanel.setStatus("stopped");
		controller.enableControls();
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


	function enableControls() {
		controlPanel.enableControls();
		canvasPanel.enableControl("Scrub");
	}

	function disableControls() {
		controlPanel.disableControls();
		canvasPanel.disableControl("Scrub");
	}

	function clearOutput() {
		outputPanel.setImageURL("Capture", "");
		outputPanel.setInfo("size", "");
		outputPanel.setWidth(model.w + 12);
	}

	function captureStill() {
		var canvas = renderList.getCanvas(),
			dataURL = canvas.toDataURL();
		outputPanel.setWidth(model.w + 12);
		outputPanel.setImageURL("Capture", dataURL);
		var header = 'data:image/png;base64,';
		var imgFileSize = Math.round((dataURL.length - header.length) * 3 / 4);
		outputPanel.setInfo("size", "Approx size: " + Math.round(imgFileSize / 1024) + "kb");
	}

	function startEncoder() {
		GIFEncoder.setMaxColors(model.maxColors);
		GIFEncoder.setRepeat(0);
		GIFEncoder.setDelay(1000 / scheduler.getFPS());
		GIFEncoder.start();
	}




	var glc =  {
		w: model.w,
		h: model.h,
		renderList: renderList,
		styles: styles,
		size: size,
		playOnce: controlPanel.playOnce,
		loop: controlPanel.loop,
		setFPS: controlPanel.setFPS,
		setDuration: controlPanel.setDuration,
		setMode: controlPanel.setMode,
		setEasing: controlPanel.setEasing,
		setMaxColors: controlPanel.setMaxColors,
		color: color
	};

	init();

	return glc;
});
