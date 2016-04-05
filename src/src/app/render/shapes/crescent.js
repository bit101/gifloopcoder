define(function() {

	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				radius = this.getNumber("radius", t, 50),
				percent = this.getNumber("percent", t, 0.5);
                scaleX = this.getNumber("scaleX", t, 1),
                scaleY = this.getNumber("scaleY", t, 1);

			// guard against negative radii, which will break.
			// alternate handling: Math.max(radius, 0);
			// this seems more useful
			radius = Math.abs(radius);
			context.translate(x, y);
            context.scale(scaleX, scaleY);
			context.rotate(this.getNumber("rotation", t, 0) * Math.PI / 180);
			for(var i = 0; i < Math.PI * 2; i += 0.01) {
				var x1 = Math.cos(i) * radius,
					y1 = Math.sin(i) * radius,
					limit = radius * percent;
				if(x1 > limit) {
					x1 = 2 * limit - x1;
				}
				context.lineTo(x1, y1);
			}

			this.drawFillAndStroke(context, t, true, false);
		}
	}
});
