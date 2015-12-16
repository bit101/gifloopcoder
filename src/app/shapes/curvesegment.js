define(function() {

	function quadratic(t, v0, v1, v2) {
		return (1 - t) * (1 - t) * v0 + 2 * (1 - t) * t * v1 + t * t * v2;
	}

	return {
		draw: function(context, t) {
			var x0 = this.getNumber("x0", t, 20),
				y0 = this.getNumber("y0", t, 20),
				x1 = this.getNumber("x1", t, 100),
				y1 = this.getNumber("y1", t, 200),
				x2 = this.getNumber("x2", t, 180),
				y2 = this.getNumber("y2", t, 20),
				percent = this.getNumber("percent", t, 0.1),
				t1 = t * (1 + percent),
				t0 = t1 - percent,
				res = 0.01,
				x,
				y;

			t1 = Math.min(t1, 1);
			t0 = Math.max(t0, 0);

			for(var i = t0; i < t1; i += res) {
				x = quadratic(i, x0, x1, x2);
				y = quadratic(i, y0, y1, y2);
				if(i === t0) {
				    context.moveTo(x, y);
				}
				else {
		    		context.lineTo(x, y);
				}
			}
			x = quadratic(t1, x0, x1, x2);
			y = quadratic(t1, y0, y1, y2);
	   		context.lineTo(x, y);

			this.drawFillAndStroke(context, t, false, true);		}
	}
});
