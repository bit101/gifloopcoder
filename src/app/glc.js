define([
	"app/renderlist", 
	"app/scheduler",
	"app/controller",
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
	controller,
	styles,
	interpolation,
	spritesheet,
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
		version: "1.0.0",
		mode: "bounce",
		easing: true,
		file: null,
		maxColors: 256,
		w: 400,
		h: 400,
		capture: false,
		captureSpriteSheet: false
	},
	internalInterface = {
		glc: null,
		scheduler: scheduler,
		renderList: renderList,
		model: model,
		GIFEncoder: GIFEncoder,
		controlPanel: controlPanel,
		toolbar: toolbar,
		canvasPanel: canvasPanel,
		outputPanel: outputPanel,
		codePanel, codePanel,
		infoPanel: infoPanel,
		spritesheet: spritesheet,
		reset: reset
	}


	function init() {
		window.addEventListener("error", function (event) {//msg, url, lineNumber, column, error) {
			window.alert(event.message + "\nLine: " + event.lineno + "\nColumn: " + event.colno);
		});
		window.addEventListener("beforeunload", function(event) {
			event.returnValue = "Any unsaved changes will be lost.";
		});
		internalInterface.glc = glc;
		controller.init(internalInterface);
		interpolation.init(model);
		toolbar.init(controller);
		codePanel.init(controller);
		renderList.init(glc, model.w, model.h, styles, interpolation);
		scheduler.init(controller);
		canvasPanel.init(model, controller, scheduler, renderList.getCanvas());
		outputPanel.init(model, controller);
		controlPanel.init(model, controller, scheduler);
		infoPanel.init(model, controller);
		setKeys();
		glc.context = renderList.getContext();
		glc.canvas = renderList.getCanvas();
	}

	function size(width, height) {
		glc.w = width;
		glc.h = height;
		controller.size(width, height);
	}

	function setKeys() {
		document.body.addEventListener("keyup", function(event) {
			// console.log(event.keyCode);
			if(event.ctrlKey) {
				switch(event.keyCode) {
					case 32: // space
						if(scheduler.isRunning()) {
							controller.stop();
						}
						else {
							controller.loop();
						}
						break;
					case 71: // G
						controller.makeGif();
						break;
					case 83: // S
						controller.saveCode();
						break;
					case 79: // O
						controller.openFile();
						break;
					case 13: // enter
						controller.updateCode();
						break;
					case 191: // forward slash
						codePanel.toggleComment();
						break;
					default:
						break;
				}
			}
		});
		document.body.addEventListener("keydown", function(event) {
			if(event.ctrlKey) {
				switch(event.keyCode) {
					case 32: // space
					case 71: // G
					case 83: // S
					case 79: // F
					case 13: // enter
					case 191: // forward slash
						event.preventDefault();
						break;
					default:
						break;
				}
			}
		});
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
		glc.styles.reset();
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
