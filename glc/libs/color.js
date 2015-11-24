define(function() {

	function rgba(r, g, b, a) {
		var clr = Object.create(color);
		clr.setRGBA(r, g, b, a);
		return clr.toString();
	}

	function rgb(r, g, b) {
		return rgba(r, g, b, 1);
	}

	function randomRGB(min, max) {
		min = min || 0;
		max = max || 256;		
		return rgb(
			Math.floor(min + Math.random() * (max - min)), 
			Math.floor(min + Math.random() * (max - min)), 
			Math.floor(min + Math.random() * (max - min))
		);
	}

	function randomGray(min, max) {
		min = min || 0;
		max = max || 256;
		return gray(Math.floor(min + Math.random() * (max - min)));
	}

	function gray(shade) {
		return rgb(shade, shade, shade);
	}

	function num(num) {
		var red = num >> 16,
			green = num >> 8 & 0xff,
			blue = num & 0xff;
		return rgb(red, green, blue);
	}

	function randomHSV(minH, maxH, minS, maxS, minV, maxV) {
		var h = minH + Math.random() * (maxH - minH),
			s = minS + Math.random() * (maxS - minS),
			v = minV + Math.random() * (maxV - minV);
		return hsv(h, s, v);
	}

	function hsva(h, s, v, a) {
		var r, g, b,
			i = Math.floor(h / 60),
			f = h / 60 - i,
			p = v * (1 - s),
			q = v * (1 - f * s),
			t = v * (1 - (1 - f) * s);
		switch (i % 6) {
			case 0: r = v, g = t, b = p; break;
			case 1: r = q, g = v, b = p; break;
			case 2: r = p, g = v, b = t; break;
			case 3: r = p, g = q, b = v; break;
			case 4: r = t, g = p, b = v; break;
			case 5: r = v, g = p, b = q; break;
		}
		return rgba(
			Math.floor(r * 255),
			Math.floor(g * 255),
			Math.floor(b * 255),
			a
		);
	}

	function hsv(h, s, v) {
		return hsva(h, s, v, 1);
	}

	function animHSVA(startH, endH, startS, endS, startV, endV, startA, endA) {
		return function(t) {
			var h = startH + t * (endH - startH),
				s = startS + t * (endS - startS),
				v = startV + t * (endV - startV),
				a = startA + t * (endA - startA);
			return hsva(h, s, v, a);
		}
	}

	function animHSV(startH, endH, startS, endS, startV, endV) {
		return animHSVA(startH, endH, startS, endS, startV, endV, 1, 1);
	}



	

	/////////////////////
	// gradients
	/////////////////////
    function createLinearGradient(x0, y0, x1, y1) {
        var g = {
            type: "linearGradient",
            x0: x0,
            y0: y0,
            x1: x1,
            y1: y1,
            colorStops: [],
            addColorStop: function(position, color) {
                this.colorStops.push({
                    position: position,
                    color: color
                });
            }
        }
        return g;
    }

    function createRadialGradient(x0, y0, r0, x1, y1, r1) {
        var g = {
            type: "radialGradient",
            x0: x0,
            y0: y0,
            r0: r0,
            x1: x1,
            y1: y1,
            r1: r1,
            colorStops: [],
            addColorStop: function(position, color) {
                this.colorStops.push({
                    position: position,
                    color: color
                });
            }
        }
        return g;
    }

	color = {
		r: 255,
		g: 255,
		b: 255,
		a: 1,

		setRGBA: function(r, g, b, a) {
			this.r = r;
			this.g = g;
			this.b = b;
			this.a = a;
			return this;
		},

		toString: function() {
			return "rgba(" + Math.floor(this.r) + "," + Math.floor(this.g) + "," + Math.floor(this.b) + "," + this.a + ")";
		}
	};

	return {
		rgb: rgb,
		rgba: rgba,
		randomRGB: randomRGB,
		randomGray: randomGray,
		gray: gray,
		num: num,
		hsv: hsv,
		hsva: hsva,
		animHSV: animHSV,
		animHSVA: animHSVA,
		randomHSV: randomHSV,
		createLinearGradient: createLinearGradient,
		createRadialGradient: createRadialGradient
	};
});