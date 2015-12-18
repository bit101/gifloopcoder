define(function() {

    function init(pModel) {
        model = pModel;
    }

    function interpolate(t) {
        switch(model.mode) {
            case "bounce":
                if(model.easing) {
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
                if(model.easing) {
                    var a = t * Math.PI;
                    return 0.5 - Math.cos(a) * 0.5;
                }
                else{
                    return t;
                }
        }
    }


	return {
        init: init,
        interpolate: interpolate,
	}
});