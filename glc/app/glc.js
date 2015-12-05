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
			file: null,
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
			startEncoder: startEncoder,
			chooseFile: chooseFile,
			reload: reload
		};

	function init() {
		renderList.init(model.w, model.h, styles, interpolation);
		scheduler.init(onRender, onComplete);
		canvasPanel.init(model, controller, renderList.getCanvas());
		outputPanel.init(model, controller);
		infoPanel.init(model, controller);
		creditsPanel.init();
		controlPanel.init(model, controller);
		setCallbacks();
		setKeys();
	}

	function size(width, height) {
		this.w = model.w = width;
		this.h = model.h = height;
		GIFEncoder.setSize(width, height);
		renderList.size(model.w, model.h);
		canvasPanel.setWidth(model.w + 12);
		outputPanel.setWidth(model.w + 12);
		controlPanel.setPosition(model.w + 50, 20);
		infoPanel.setPosition(model.w + 50, 430);
		outputPanel.setPosition(model.w + 220, 20);
	}

	function setKeys() {
		document.body.addEventListener("keyup", function(event) {
			console.log(event.keyCode);
			switch(event.keyCode) {
				case 82: // R
					reload();
					break;
				case 80: // P
					if(scheduler.isRunning()) {
						controller.stop();
					}
					else {
						controller.loop();
					}
					break;
				case 71: // G
					controlPanel.makeGif();
					break;
				case 83: // S
					controller.captureStill();
					break;
				case 70: // F
					controlPanel.chooseFileDialog();
					break;
				default:
					break;
			}
		});
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

	function chooseFile(event) {
		model.file = event.target.files[0];
		controlPanel.setFileName(model.file.name);
		reload();
	}

	function reload() {
		if(!model.file) return;
		controller.clearOutput();

		var reader = new FileReader();
		reader.onload = function() {
			renderList.clear();
			reset();
			var script = document.getElementById("loaded_script");
			if(script) {
				document.head.removeChild(script);
			}

			script = document.createElement("script");
			script.id = "loaded_script";
			document.head.appendChild(script);

			script.textContent = reader.result;

			if(window.onGLC) {
				window.onGLC(glc);
			}
		}
		reader.readAsText(model.file);
	}

	function reset() {
		glc.size(400, 400);
		glc.setFPS(30);
		glc.setDuration(2);
		glc.setMode("bounce");
		glc.setEasing(true);
		glc.setMaxColors(256);
		glc.setQuality(10);
		glc.styles.backgroundColor = "#ffffff";
		glc.styles.lineWidth = 5;
		glc.styles.strokeStyle = "#000000";
		glc.styles.fillStyle = "#000000";
		glc.styles.lineCap = "round";
		glc.styles.lineJoin = "miter";
		glc.styles.lineDash = [];
		glc.styles.miterLimit = 10;
		glc.styles.shadowColor = null;
		glc.styles.shadowOffsetX = null;
		glc.styles.shadowOffsetY = null;
		glc.styles.shadowBlur = null;
		glc.styles.globalAlpha = 1;
		glc.styles.translationX = 0;
		glc.styles.translationY = 0;
		glc.styles.shake = 0;
		glc.styles.blendMode = "source-over";
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
		setQuality: GIFEncoder.setQuality,
		color: color
	};

	init();

	return glc;
});
