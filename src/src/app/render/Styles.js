define(function() {
	var defaultStyles = {
		backgroundColor: "#ffffff",
		lineWidth: 1,
		strokeStyle: "#000000",
		fillStyle: "#000000",
		lineCap: "round",
		lineJoin: "round",
		lineDash: [],
		lineDashOffset: 0,
		miterLimit: 10,
		shadowColor: null,
		shadowOffsetX: 0,
		shadowOffsetY: 0,
		shadowBlur: 0,
		globalAlpha: 1,
		translationX: 0,
		translationY: 0,
		shake: 0,
		blendMode: "source-over",
		reset: reset
	},
	styles = {};

	reset();

	function reset() {
		for(var prop in defaultStyles) {
			styles[prop] = defaultStyles[prop];
		}
	}



	return styles;

});
