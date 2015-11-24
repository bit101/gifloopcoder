define(function() {
	var context = document.createElement("canvas").getContext("2d");

	function getColor(prop, t, def) {
		if(prop === undefined) {
			return def;
		}
		if(typeof(prop) === "string") {
			if(prop.charAt(0) === "#" && prop.length > 7) {
				var obj = getColorObj(prop);
				return getColorString(obj);
			}
			return prop;
		}
		else if(typeof(prop) === "function") {
			return prop(t);
		}
		else if(prop && prop.length === 2) {
			if(isLinearGradient(prop)) {
				return parseLinearGradient(prop, t);
			}
			if(isRadialGradient(prop)) {
				return parseRadialGradient(prop, t);
			}
			var c0 = getColorObj(prop[0]),
				c1 = getColorObj(prop[1]);
			return interpolateColor([c0, c1], t);
		}
		else if(prop && prop.length) {
			return  prop[Math.round(t * (prop.length - 1))];
		}
		if(prop.type === "linearGradient") {
			var g = context.createLinearGradient(prop.x0, prop.y0, prop.x1, prop.y1);
			for(var i = 0; i < prop.colorStops.length; i++) {
				var stop = prop.colorStops[i];
				g.addColorStop(stop.position, stop.color);
			}
			return g;
		}
		if(prop.type === "radialGradient") {
			var g = context.createRadialGradient(prop.x0, prop.y0, prop.r0, prop.x1, prop.y1, prop.r1);
			for(var i = 0; i < prop.colorStops.length; i++) {
				var stop = prop.colorStops[i];
				g.addColorStop(stop.position, stop.color);
			}
			return g;
		}
		return def;
	}

	function isLinearGradient(prop) {
		return prop[0].type === "linearGradient" && prop[1].type === "linearGradient";
	}

	function parseLinearGradient(prop, t) {
		var g0 = prop[0],
			g1 = prop[1],
			x0 = g0.x0 + (g1.x0 - g0.x0) * t,
			y0 = g0.y0 + (g1.y0 - g0.y0) * t,
			x1 = g0.x1 + (g1.x1 - g0.x1) * t,
			y1 = g0.y1 + (g1.y1 - g0.y1) * t;

		var g = context.createLinearGradient(x0, y0, x1, y1);
		for(var i = 0; i < g0.colorStops.length; i++) {
			var stopA = g0.colorStops[i],
				stopB = g1.colorStops[i],
				position = stopA.position + (stopB.position - stopA.position) * t,
				colorA = getColorObj(stopA.color),
				colorB = getColorObj(stopB.color),
				color = interpolateColor([colorA, colorB], t);
			g.addColorStop(position, color);
		}
		return g;
	}

	function isRadialGradient(prop) {
		return prop[0].type === "radialGradient" && prop[1].type === "radialGradient";
	}

	function parseRadialGradient(prop, t) {
		var g0 = prop[0],
			g1 = prop[1],
			x0 = g0.x0 + (g1.x0 - g0.x0) * t,
			y0 = g0.y0 + (g1.y0 - g0.y0) * t,
			r0 = g0.r0 + (g1.r0 - g0.r0) * t,
			x1 = g0.x1 + (g1.x1 - g0.x1) * t,
			y1 = g0.y1 + (g1.y1 - g0.y1) * t,
			r1 = g0.r1 + (g1.r1 - g0.r1) * t;

		var g = context.createRadialGradient(x0, y0, r0, x1, y1, r1);
		for(var i = 0; i < g0.colorStops.length; i++) {
			var stopA = g0.colorStops[i],
				stopB = g1.colorStops[i],
				position = stopA.position + (stopB.position - stopA.position) * t,
				colorA = getColorObj(stopA.color),
				colorB = getColorObj(stopB.color),
				color = interpolateColor([colorA, colorB], t);
			g.addColorStop(position, color);
		}
		return g;
	}

	function getColorString(obj) {
		return "rgba(" + obj.r + "," + obj.g + "," + obj.b + "," + (obj.a / 255) + ")";
	}



	function getColorObj(color) {
		if(color.charAt(0) === "#") {
			if(color.length === 7) { // #rrggbb
				return {
					a: 255,
					r: parseInt(color.substring(1, 3), 16),
					g: parseInt(color.substring(3, 5), 16),
					b: parseInt(color.substring(5, 7), 16)
				}
			}
			else if(color.length === 9) { // #aarrggbb
				return {
					a: parseInt(color.substring(1, 3), 16),
					r: parseInt(color.substring(3, 5), 16),
					g: parseInt(color.substring(5, 7), 16),
					b: parseInt(color.substring(7, 9), 16)
				}
			}
			else { // #rgb
				var r = color.charAt(1),
					g = color.charAt(2),
					b = color.charAt(3);

				return {
					a: 255,
					r: parseInt(r + r, 16),
					g: parseInt(g + g, 16),
					b: parseInt(b + b, 16),
				}
			}
		}
		else if(color.substring(0, 4) === "rgb(") {
			var s = color.indexOf("(") + 1,
				e = color.indexOf(")"),
				channels = color.substring(s, e).split(",");
			return {
				a: 255,
				r: parseInt(channels[0], 10),
				g: parseInt(channels[1], 10),
				b: parseInt(channels[2], 10),
			}
		}
		else if(color.substring(0, 4) === "rgba") {
			var s = color.indexOf("(") + 1,
				e = color.indexOf(")"),
				channels = color.substring(s, e).split(",");
			return {
				a: parseFloat(channels[3]) * 255,
				r: parseInt(channels[0], 10),
				g: parseInt(channels[1], 10),
				b: parseInt(channels[2], 10),
			}
		}
		else {
			color = color.toLowerCase();
			if(namedColors[color] != null) {
				return getColorObj(namedColors[color]);
			}
		}
		return 0;
	}

	function interpolateColor(arr, t) {
		var c0 = arr[0],
			c1 = arr[1];

		var alpha = c0.a + (c1.a - c0.a) * t,
			red = Math.round(c0.r + (c1.r - c0.r) * t),
			green = Math.round(c0.g + (c1.g - c0.g) * t),
			blue = Math.round(c0.b + (c1.b - c0.b) * t);
		return "rgba(" + red + "," + green + "," + blue + "," + (alpha / 255) + ")";
	}

	var namedColors = {
		aliceblue: "#f0f8ff",
		antiquewhite: "#faebd7",
		aqua: "#00ffff",
		aquamarine: "#7fffd4",
		azure: "#f0ffff",
		beige: "#f5f5dc",
		bisque: "#ffe4c4",
		black: "#000000",
		blanchedalmond: "#ffebcd",
		blue: "#0000ff",
		blueviolet: "#8a2be2",
		brown: "#a52a2a",
		burlywood: "#deb887",
		cadetblue: "#5f9ea0",
		chartreuse: "#7fff00",
		chocolate: "#d2691e",
		coral: "#ff7f50",
		cornflowerblue: "#6495ed",
		cornsilk: "#fff8dc",
		crimson: "#dc143c",
		cyan: "#00ffff",
		darkblue: "#00008b",
		darkcyan: "#008b8b",
		darkgoldenrod: "#b8860b",
		darkgray: "#a9a9a9",
		darkgrey: "#a9a9a9",
		darkgreen: "#006400",
		darkkhaki: "#bdb76b",
		darkmagenta: "#8b008b",
		darkolivegreen: "#556b2f",
		darkorange: "#ff8c00",
		darkorchid: "#9932cc",
		darkred: "#8b0000",
		darksalmon: "#e9967a",
		darkseagreen: "#8fbc8f",
		darkslateblue: "#483d8b",
		darkslategray: "#2f4f4f",
		darkslategrey: "#2f4f4f",
		darkturquoise: "#00ced1",
		darkviolet: "#9400d3",
		deeppink: "#ff1493",
		deepskyblue: "#00bfff",
		dimgray: "#696969",
		dimgrey: "#696969",
		dodgerblue: "#1e90ff",
		firebrick: "#b22222",
		floralwhite: "#fffaf0",
		forestgreen: "#228b22",
		fuchsia: "#ff00ff",
		gainsboro: "#dcdcdc",
		ghostwhite: "#f8f8ff",
		gold: "#ffd700",
		goldenrod: "#daa520",
		gray: "#808080",
		grey: "#808080",
		green: "#008000",
		greenyellow: "#adff2f",
		honeydew: "#f0fff0",
		hotpink: "#ff69b4",
		indianred: "#cd5c5c",
		indigo: "#4b0082",
		ivory: "#fffff0",
		khaki: "#f0e68c",
		lavender: "#e6e6fa",
		lavenderblush: "#fff0f5",
		lawngreen: "#7cfc00",
		lemonchiffon: "#fffacd",
		lightblue: "#add8e6",
		lightcoral: "#f08080",
		lightcyan: "#e0ffff",
		lightgoldenrodyellow: "#fafad2",
		lightgray: "#d3d3d3",
		lightgrey: "#d3d3d3",
		lightgreen: "#90ee90",
		lightpink: "#ffb6c1",
		lightsalmon: "#ffa07a",
		lightseagreen: "#20b2aa",
		lightskyblue: "#87cefa",
		lightslategray: "#778899",
		lightslategrey: "#778899",
		lightsteelblue: "#b0c4de",
		lightyellow: "#ffffe0",
		lime: "#00ff00",
		limegreen: "#32cd32",
		linen: "#faf0e6",
		magenta: "#ff00ff",
		maroon: "#800000",
		mediumaquamarine: "#66cdaa",
		mediumblue: "#0000cd",
		mediumorchid: "#ba55d3",
		mediumpurple: "#9370d8",
		mediumseagreen: "#3cb371",
		mediumslateblue: "#7b68ee",
		mediumspringgreen: "#00fa9a",
		mediumturquoise: "#48d1cc",
		mediumvioletred: "#c71585",
		midnightblue: "#191970",
		mintcream: "#f5fffa",
		mistyrose: "#ffe4e1",
		moccasin: "#ffe4b5",
		navajowhite: "#ffdead",
		navy: "#000080",
		oldlace: "#fdf5e6",
		olive: "#808000",
		olivedrab: "#6b8e23",
		orange: "#ffa500",
		orangered: "#ff4500",
		orchid: "#da70d6",
		palegoldenrod: "#eee8aa",
		palegreen: "#98fb98",
		paleturquoise: "#afeeee",
		palevioletred: "#d87093",
		papayawhip: "#ffefd5",
		peachpuff: "#ffdab9",
		peru: "#cd853f",
		pink: "#ffc0cb",
		plum: "#dda0dd",
		powderblue: "#b0e0e6",
		purple: "#800080",
		red: "#ff0000",
		rosybrown: "#bc8f8f",
		royalblue: "#4169e1",
		saddlebrown: "#8b4513",
		salmon: "#fa8072",
		sandybrown: "#f4a460",
		seagreen: "#2e8b57",
		seashell: "#fff5ee",
		sienna: "#a0522d",
		silver: "#c0c0c0",
		skyblue: "#87ceeb",
		slateblue: "#6a5acd",
		slategray: "#708090",
		slategrey: "#708090",
		snow: "#fffafa",
		springgreen: "#00ff7f",
		steelblue: "#4682b4",
		tan: "#d2b48c",
		teal: "#008080",
		thistle: "#d8bfd8",
		tomato: "#ff6347",
		turquoise: "#40e0d0",
		violet: "#ee82ee",
		wheat: "#f5deb3",
		white: "#ffffff",
		whitesmoke: "#f5f5f5",
		yellow: "#ffff00",
		yellowgreen: "#9acd32",
	}

	return {
		getColor: getColor
	};
});