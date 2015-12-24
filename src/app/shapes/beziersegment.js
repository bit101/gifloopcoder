define(function() {

	function bezier(t, v0, v1, v2, v3) {
		return (1 - t) * (1 - t) * (1 - t) * v0 + 3 * (1 - t) * (1 - t) * t * v1 + 3 * (1 - t) * t * t * v2 + t * t * t * v3;
	}

	return {
		draw: function(context, t) {
			var x0 = this.getNumber("x0", t, 50),
				y0 = this.getNumber("y0", t, 10),
				x1 = this.getNumber("x1", t, 200),
				y1 = this.getNumber("y1", t, 100),
				x2 = this.getNumber("x2", t, 0),
				y2 = this.getNumber("y2", t, 100),
				x3 = this.getNumber("x3", t, 150),
				y3 = this.getNumber("y3", t, 10),
				percent = this.getNumber("percent", t, 0.1),
				t1 = t * (1 + percent),
				t0 = t1 - percent,
				res = 0.01,
				x,
				y;

			t1 = Math.min(t1, 1.001);
			t0 = Math.max(t0, -0.001);

			for(var i = t0; i < t1; i += res) {
				x = bezier(i, x0, x1, x2, x3);
				y = bezier(i, y0, y1, y2, y3);
				if(i === t0) {
				    context.moveTo(x, y);
				}
				else {
		    		context.lineTo(x, y);
				}
			}
			x = bezier(t1, x0, x1, x2, x3);
			y = bezier(t1, y0, y1, y2, y3);
	   		context.lineTo(x, y);

			this.drawFillAndStroke(context, t, false, true);
		}
	}
});
