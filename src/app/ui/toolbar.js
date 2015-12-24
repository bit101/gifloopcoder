define(function() {

    var controller = null,
        fileInput = null,
        disabled = false;

        toolbar = document.getElementById("header"),
        
        openBtn = document.getElementById("open_btn"),
        newBtn = document.getElementById("new_btn"),
        compileBtn = document.getElementById("compile_btn"),
        saveBtn = document.getElementById("save_btn"),
        
        loopBtn = document.getElementById("loop_btn"),
        onceBtn = document.getElementById("once_btn"),
        pauseBtn = document.getElementById("pause_btn"),
        
        gifBtn = document.getElementById("gif_btn"),
        stillBtn = document.getElementById("still_btn"),
        spriteBtn = document.getElementById("sprite_btn"),

        aboutBtn = document.getElementById("about_btn");


    function init(pController) {
        if(!window.glcSettings.useIntegratedEditor) {
            openBtn.style.display = "none";
            newBtn.style.display = "none";
            compileBtn.style.display = "none";
            saveBtn.style.display = "none";
        }
        controller = pController;
        setupFile();
        addListeners();
        pauseBtn.className = "disabled";
    }

    function setupFile() {
        fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.addEventListener("change", controller.chooseFile);
        fileInput.addEventListener("click", function() {
            this.value = null;
        })
    }

    function addListeners() {
        openBtn.addEventListener("click", function() {
            fileInput.click();
        });

        newBtn.addEventListener("click", function() {
            controller.newFile();
        });

        compileBtn.addEventListener("click", function() {
            controller.updateCode();
        });

        saveBtn.addEventListener("click", function() {
            controller.saveCode();
        });

        loopBtn.addEventListener("click", function() {
            controller.loop();
        });

        onceBtn.addEventListener("click", function() {
            controller.playOnce();
        });

        pauseBtn.addEventListener("click", function() {
            controller.stop();
        });

        gifBtn.addEventListener("click", function() {
            if(!disabled) {
                controller.makeGif();
            }
        });

        stillBtn.addEventListener("click", function() {
            controller.captureStill();
        });

        spriteBtn.addEventListener("click", function() {
            if(!disabled) {
                controller.makeSpriteSheet();
            }
        });

        aboutBtn.addEventListener("click", function() {
            controller.showInfoPanel();
        });
    }

    function enableControls() {
        disabled = false;
        loopBtn.className = "";
        onceBtn.className = "";
        gifBtn.className = "";
        spriteBtn.className = "";
        pauseBtn.className = "disabled";
    }

    function disableControls() {
        disabled = true;
        loopBtn.className = "disabled";
        onceBtn.className = "disabled";
        gifBtn.className = "disabled";
        spriteBtn.className = "disabled";
        pauseBtn.className = "";
    }

    function chooseFileDialog() {
        fileInput.click();
    }


    return {
        init: init,
        enableControls: enableControls,
        disableControls: disableControls,
        chooseFileDialog: chooseFileDialog
    };

});