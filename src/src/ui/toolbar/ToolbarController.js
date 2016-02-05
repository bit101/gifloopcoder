define(function(require) {

    var ToolbarView = require("ui/toolbar/ToolbarView"),
        MainController = null,
        CanvasController = null;
        Scheduler = null,
        playEnabled = true;

    function init(pMainController) {
        MainController = pMainController;

        ToolbarView.init();
        if(!glcConfig.externalEditor) {
            ToolbarView.addButton("new_btn", "icons/new.png", "NEW", MainController.newFile);
            ToolbarView.addButton("open_btn", "icons/open.png", "OPEN", MainController.open);
            ToolbarView.addButton("save_btn", "icons/save.png", "SAVE", MainController.save);
            if(glcConfig.isStandalone) {
                ToolbarView.addButton("saveas_btn", "icons/saveas.png", "SAVE AS", MainController.saveAs);
            }
            ToolbarView.addButton("compile_btn", "icons/compile.png", "COMPILE", MainController.compile);
            ToolbarView.addSeparator();

            ToolbarView.setKey(79, "keydown", MainController.open); // O
            ToolbarView.setKey(83, "keydown", MainController.save); // S
            ToolbarView.setKey(13, "keyup", MainController.compile); // Enter
        }

        ToolbarView.addButton("loop_btn", "icons/loop.png", "LOOP", MainController.loop);
        ToolbarView.addButton("once_btn", "icons/once.png", "ONCE", MainController.playOnce);
        ToolbarView.addButton("pause_btn", "icons/pause.png", "PAUSE", MainController.stop);
        ToolbarView.addSeparator();

        ToolbarView.addButton("gif_btn", "icons/gif.png", "MAKE GIF", MainController.makeGif);
        ToolbarView.addButton("still_btn", "icons/still.png", "CAPTURE STILL", MainController.captureStill);
        ToolbarView.addButton("sprite_btn", "icons/sprite.png", "SPRITE SHEET", MainController.makeSpriteSheet);
        if(!glcConfig.externalEditor) {
            ToolbarView.addButton("sequence_btn", "icons/sequence.png", "IMAGE SEQUENCE", MainController.makeImageSequence);
        }
        ToolbarView.addSeparator();

        if(glcConfig.isStandalone) {
            ToolbarView.addButton("console_btn", "icons/console.png", "CONSOLE", showConsole);
            ToolbarView.addSeparator();
        }

        ToolbarView.addButton("icon_btn", "icons/help.png", "ABOUT", MainController.showAbout);

        ToolbarView.setKey(71, "keydown", makeGif); // G
        ToolbarView.setKey(32, "keyup", MainController.toggleLoop);

        ToolbarView.disableBtn("pause_btn");
    }

    function makeGif() {
        if(playEnabled) {
            MainController.makeGif();
        }
    }

    function enablePlay() {
        playEnabled = true;
        ToolbarView.enableBtn("loop_btn");
        ToolbarView.enableBtn("once_btn");
        ToolbarView.disableBtn("pause_btn")
        ToolbarView.enableBtn("gif_btn");
        ToolbarView.enableBtn("sprite_btn");
        ToolbarView.enableBtn("sequence_btn");
    }

    function disablePlay() {
        playEnabled = false;
        ToolbarView.disableBtn("loop_btn");
        ToolbarView.disableBtn("once_btn");
        ToolbarView.enableBtn("pause_btn")
        ToolbarView.disableBtn("gif_btn");
        ToolbarView.disableBtn("sprite_btn");
        ToolbarView.disableBtn("sequence_btn");
    }

    function setDirty(dirty) {
        ToolbarView.setDirty(dirty);
    }

    function showConsole() {
        var electron = nodeRequire("electron");
        electron.remote.getCurrentWindow().openDevTools();

    }


    return {
        init: init,
        enablePlay: enablePlay,
        disablePlay: disablePlay,
        setDirty: setDirty
    };
});