define(function() {
	
	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				w = this.getNumber("w", t, 50),
				h = this.getNumber("h", t, 50);

			var x0 = 0,
				y0 = -.25,
				x1 = .2,
				y1 = -.8,
				x2 = 1.1,
				y2 = -.2,
				x3 = 0,
				y3 = .5;

		    context.save();
		    context.translate(x, y);
		    context.rotate(this.getNumber("rotation", t, 0) * Math.PI / 180);
		    context.save();
		    context.scale(w, h);
		    context.moveTo(x0, y0);
		    context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
		    context.bezierCurveTo(-x2, y2, -x1, y1, -x0, y0);
		    context.restore();
			this.drawFillAndStroke(context, t, true, false);
		    context.restore();
		}
	}
});
