define([
	"app/renderlist", 
	"app/scheduler", 
	"app/styles",
	"app/interpolation",
	"libs/quicksettings",
	"libs/GIFEncoder",
	"libs/color",
	"app/ui/controlpanel",
	"app/ui/creditspanel",
	"app/ui/infopanel",
	"app/ui/canvaspanel",
	"app/ui/outputpanel"],
	
function(
	renderList, 
	scheduler, 
	styles,
	interpolation,
	QuickSettings,
	GIFEncoder,
	color,
	controlPanel,
	creditsPanel,
	infoPanel,
	canvasPanel,
	outputPanel) {

	// this could be a module too. 
	// ideally it wouldn't know about scheduler directly
	var model = {
			// interpolation could just be absorbed into model
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
		};

	// this could be a module that knows about all panels + schedule
	var controller = {
			playOnce: scheduler.playOnce,
			loop: scheduler.loop,
			stop: scheduler.stop,
			enableControls: enableControls,
			disableControls: disableControls,
			clearOutput: outputPanel.clearOutput,
			captureStill: captureStill,
			showCredits: creditsPanel.show,
			renderFrame: renderList.render,
			startEncoder: startEncoder
		};

	function init() {
		loadCSS();
		renderList.init(model.w, model.h, styles, interpolation);
		scheduler.init(onRender, onComplete);
		canvasPanel.init(model, controller, renderList.getCanvas());
		outputPanel.init(model, controller);
		infoPanel.init(model, controller);
		creditsPanel.init();
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

	/////////////////////
	// callback methods
	/////////////////////

	function setCallbacks() {
		scheduler.renderCallback = onRender;
		scheduler.completeCallback = onComplete;
	}


	function onRender(t) {
		canvasPanel.setTime(t);
		renderList.render(t);
		if(model.capture) {
			controlPanel.setStatus("capturing...");
			GIFEncoder.addFrame(renderList.getContext());
		}
	}

	function onComplete() {
		if(model.capture) {
			model.capture = false;
			GIFEncoder.finish();
			outputPanel.setGIF(GIFEncoder.stream().getData());
		}
		controlPanel.setStatus("stopped");
		controller.enableControls();
	}

	/////////////////////
	// controller methods
	/////////////////////

	function enableControls() {
		controlPanel.enableControls();
		canvasPanel.enableControls();
	}

	function disableControls() {
		controlPanel.disableControls();
		canvasPanel.disableControls();
	}

	function captureStill() {
		var canvas = renderList.getCanvas(),
			dataURL = canvas.toDataURL();
		outputPanel.setWidth(model.w + 12);
		outputPanel.setPNG(dataURL);
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
