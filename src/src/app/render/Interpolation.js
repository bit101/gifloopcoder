define(function() {
    var mode = "bounce",
        easing = true

    function interpolate(t) {
        switch(mode) {
            case "bounce":
                if(easing) {
                    var a = t * Math.PI * 2;
                    return 0.5 - Math.cos(a) * 0.5;
                }
                else {
                    t = t % 1;
                    return t < 0.5 ? t * 2 : t = (1 - t) * 2;
                }
                break;

            case "single":
            default:
                if(t > 1) {
                    t %= 1;
                }
                if(easing) {
                    var a = t * Math.PI;
                    return 0.5 - Math.cos(a) * 0.5;
                }
                else{
                    return t;
                }
        }
    }

    function setMode(pMode) {
        mode = pMode.toLowerCase();
    }

    function setEasing(pEasing) {
        easing = pEasing;
    }


	return {
        interpolate: interpolate,
        setMode: setMode,
        setEasing: setEasing
	}
});