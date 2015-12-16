define([
	"app/renderlist", 
	"app/scheduler", 
	"app/styles",
	"app/interpolation",
	"app/spritesheet",
	"libs/quicksettings",
	"libs/GIFEncoder",
	"libs/color",
	"app/ui/controlpanel",
	"app/ui/infopanel",
	"app/ui/canvaspanel",
	"app/ui/outputpanel",
	"app/ui/codePanel",
	"app/ui/toolbar"],
	
function(
	renderList, 
	scheduler, 
	styles,
	interpolation,
	SpriteSheet,
	QuickSettings,
	GIFEncoder,
	color,
	controlPanel,
	infoPanel,
	canvasPanel,
	outputPanel,
	codePanel,
	toolbar) {

	// this could be a module too. 
	// ideally it wouldn't know about scheduler directly
	var model = {
		interpolation: interpolation,
		file: null,
		maxColors: 256,
		w: 400,
		h: 400,
		capture: false,
		captureSpriteSheet: false,
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
		playOnce: function() {
			scheduler.playOnce();
			disableControls();
			controlPanel.setStatus("playing");
		},
		loop: function() {
			scheduler.loop();
			disableControls();
			controlPanel.setStatus("playing");
		},
		stop: function() {
			scheduler.stop();
			enableControls();
			controlPanel.setStatus("stopped");
		},
		enableControls: enableControls,
		disableControls: disableControls,
		clearOutput: outputPanel.clearOutput,
		captureStill: captureStill,
		renderFrame: renderList.render,
		startEncoder: startEncoder,
		chooseFile: chooseFile,
		reload: reload,
		showInfoPanel: showInfoPanel,
		initSpriteSheet: initSpriteSheet,
		updateCode: updateCode,
		makeGif: makeGif,
		makeSpriteSheet: makeSpriteSheet,
		saveCode: codePanel.saveCode
	};

	function init() {
		window.addEventListener("error", function (event) {//msg, url, lineNumber, column, error) {
			window.alert(event.message + "\nLine: " + event.lineno + "\nColumn: " + event.colno);
		});
		window.addEventListener("beforeunload", function(event) {
			event.returnValue = "Any unsaved changes will be lost.";
		});
		toolbar.init(controller);
		codePanel.init(controller);
		renderList.init(glc, model.w, model.h, styles, interpolation);
		scheduler.init(onRender, onComplete);
		canvasPanel.init(model, controller, renderList.getCanvas());
		outputPanel.init(model, controller);
		controlPanel.init(model, controller);
		infoPanel.init(model, controller);
		setCallbacks();
		setKeys();
		glc.context = renderList.getContext();
		glc.canvas = renderList.getCanvas();
	}

	function size(width, height) {
		this.w = model.w = width;
		this.h = model.h = height;
		GIFEncoder.setSize(width, height);
		SpriteSheet.setSize(width, height);
		renderList.size(model.w, model.h);
		canvasPanel.setWidth(model.w + 12);
		outputPanel.setWidth(model.w + 12);
	}

	function setKeys() {
		document.body.addEventListener("keyup", function(event) {
			// console.log(event.keyCode);
			if(event.ctrlKey) {
				switch(event.keyCode) {
					case 82: // R
						reload();
						break;
					case 32: // space
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
						toolbar.chooseFileDialog();
						break;
					case 13: // enter
						updateCode();
						break;
					default:
						break;
				}
			}
		});
		document.body.addEventListener("keydown", function(event) {
			if(event.ctrlKey) {
				switch(event.keyCode) {
					case 82: // R
					case 32: // space
					case 71: // G
					case 83: // S
					case 70: // F
					case 13: // enter
						event.preventDefault();
						break;
					default:
						break;
				}
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
		if(model.captureSpriteSheet) {
			SpriteSheet.addFrame(renderList.getCanvas());
		}
	}

	function onComplete() {
		if(model.capture) {
			model.capture = false;
			GIFEncoder.finish();
			outputPanel.setGIF(GIFEncoder.stream().getData());
		}
		if(model.captureSpriteSheet) {
			model.captureSpriteSheet = false;
	        outputPanel.setWidth(SpriteSheet.getSpriteSheetSize() + 12);
			outputPanel.setPNG(SpriteSheet.getImage());
		}
		controlPanel.setStatus("stopped");
		enableControls();
	}

	/////////////////////
	// controller methods
	/////////////////////

	function enableControls() {
		toolbar.enableControls();
		canvasPanel.enableControls();
	}

	function disableControls() {
		toolbar.disableControls();
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
		reload();
	}

	function reload() {
		if(!model.file) return;
		controller.clearOutput();

		var reader = new FileReader();
		reader.onload = function() {
			setCode(reader.result, true);
		}
		reader.readAsText(model.file);
	}

	function updateCode() {
		setCode(codePanel.getCode(), false);
	}

	function setCode(code, updateCodePanel) {
		renderList.clear();
		reset();
		var script = document.getElementById("loaded_script");
		if(script) {
			document.head.removeChild(script);
		}

		script = document.createElement("script");
		script.id = "loaded_script";
		document.head.appendChild(script);

		script.textContent = code;
		if(updateCodePanel) {
			codePanel.setCode(code);
		}

		if(window.onGLC) {
			setTimeout(function() {
				window.onGLC(glc);
			}, 100);
		}
	}

	function showInfoPanel() {
		infoPanel.show();
	}

	function makeGif() {
		if(!model.getIsRunning()) {
			controller.clearOutput();
			model.capture = true;
			controller.startEncoder();
			controller.playOnce();
		}
		else {
			controlPanel.setStatus("Animation already running");
		}
	}

	function makeSpriteSheet() {
		if(!model.getIsRunning()) {
			controller.clearOutput();
			model.captureSpriteSheet = true;
			controller.initSpriteSheet();
			controller.playOnce();
		}
		else {
			controlPanel.setStatus("Animation already running");
		}
	}


	function reset() {
		scheduler.stop();
		glc.onEnterFrame = null;
		glc.onExitFrame = null;
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

	function initSpriteSheet() {
		SpriteSheet.init(scheduler.getFPS(), scheduler.getDuration());
	}



	var glc =  {
		w: model.w,
		h: model.h,
		renderList: renderList,
		styles: styles,
		size: size,
		playOnce: controller.playOnce,
		loop: controller.loop,
		setFPS: controlPanel.setFPS,
		setDuration: controlPanel.setDuration,
		setMode: controlPanel.setMode,
		setEasing: controlPanel.setEasing,
		setMaxColors: controlPanel.setMaxColors,
		setQuality: GIFEncoder.setQuality,
		color: color,
		onEnterFrame: null,
		onExitFrame: null,
		context: null,
		canvas: null
	};

	init();

	return glc;
});
