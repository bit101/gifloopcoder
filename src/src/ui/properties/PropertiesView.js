define(function(require) {

    var UIUtil = require("utils/UIUtil"),
        listener = null,
        div = null,
        durationLabel,
        durationSlider,
        fpsLabel,
        fpsSlider,
        maxColorLabel,
        maxColorsSlider,
        modeSelect,
        easingCheckBox,
        easingLabel,
        status;

    function init(pListener) {
        listener = pListener;
        div = UIUtil.createDiv("control_panel", document.getElementById("content"));
        
        durationLabel = UIUtil.createDiv("control_label", div);
        durationLabel.innerHTML = "Duration: 2";
        durationSlider = UIUtil.createInput("range", "slider", div, null, "input", onDurationChange);
        durationSlider.min = 0.5;
        durationSlider.max = 30;
        durationSlider.step = 0.5;
        durationSlider.value = 2;

        fpsLabel = UIUtil.createDiv("control_label", div);
        fpsLabel.innerHTML = "FPS: 30";
        fpsSlider = UIUtil.createInput("range", "slider", div, null, "input", onFPSChange);
        fpsSlider.min = 1;
        fpsSlider.max = 60;
        fpsSlider.step = 1;
        fpsSlider.value = 30;
        
        maxColorLabel = UIUtil.createDiv("control_label", div);
        maxColorLabel.innerHTML = "Max Colors: 256";
        maxColorsSlider = UIUtil.createInput("range", "slider", div, null, "input", onMaxColorsChange);
        maxColorsSlider.min = 1;
        maxColorsSlider.max = 256;
        maxColorsSlider.step = 1;
        maxColorsSlider.value = 256;

        modeSelect = UIUtil.createSelect("dropdown", div, null, ["bounce", "single"], onModeChange);

        easingCheckBox = UIUtil.createCheckbox("control_label", "Easing", div, {verticalAlign: "top"}, onEasingChange);
        easingCheckBox.checked = true;

        status = UIUtil.createDiv("control_label", div, { marginTop: "20px"});
        setStatus("stopped");

    }

    function onDurationChange() {
        durationLabel.innerHTML = "Duration: " + durationSlider.value;
        listener.onDurationChange(Number(durationSlider.value));
    }

    function onFPSChange() {
        fpsLabel.innerHTML = "FPS: " + fpsSlider.value;
        listener.onFPSChange(Number(fpsSlider.value));
    }

    function onMaxColorsChange() {
        maxColorLabel.innerHTML = "Max Colors: " + maxColorsSlider.value;
        listener.onMaxColorsChange(Number(maxColorsSlider.value));
    }

    function onModeChange() {
        listener.onModeChange(modeSelect.value);
    }

    function onEasingChange() {
        listener.onEasingChange(easingCheckBox.checked);
    }

    function setDuration(duration) {
        durationSlider.value = duration;
        durationLabel.innerHTML = "Duration: " + durationSlider.value;
    }

    function setFPS(fps) {
        fpsSlider.value = fps;
        fpsLabel.innerHTML = "FPS: " + fpsSlider.value;
    }

    function setMaxColors(maxColors) {
        maxColorsSlider.value = maxColors;
        maxColorLabel.innerHTML = "Max Colors: " + maxColorsSlider.value;
    }

    function setMode(mode) {
        modeSelect.value = mode;
    }

    function setEasing(easing) {
        easingCheckBox.checked = easing;
    }

    function setStatus(pStatus) {
        status.innerHTML = "Status: " + pStatus;
    }

    function disable() {
        fpsSlider.disabled = true;
        maxColorsSlider.disabled = true;
        durationSlider.disabled = true;
        modeSelect.disabled = true;
        easingCheckBox.disabled = true;
    }

    function enable() {
        fpsSlider.disabled = false;
        maxColorsSlider.disabled = false;
        durationSlider.disabled = false;
        modeSelect.disabled = false;
        easingCheckBox.disabled = false;
    }

    return {
        init: init,
        setDuration: setDuration,
        setFPS: setFPS,
        setMaxColors: setMaxColors,
        setMode: setMode,
        setEasing: setEasing,
        setStatus: setStatus,
        disable: disable,
        enable: enable
    }

});