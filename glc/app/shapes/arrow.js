define(function() {
	
	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				w = this.getNumber("w", t, 100),
				h = this.getNumber("h", t, 100),
				pointPercent = this.getNumber("pointPercent", t, 0.5),
				shaftPercent = this.getNumber("shaftPercent", t, 0.5);
				
			context.translate(x, y);
			context.rotate(this.getNumber("rotation", t, 0) * Math.PI / 180);

			context.translate(-w / 2, 0);

			context.moveTo(0, -h * shaftPercent * 0.5);
			context.lineTo(w - w * pointPercent, -h * shaftPercent * 0.5);
			context.lineTo(w - w * pointPercent, -h * 0.5);
			context.lineTo(w, 0);
			context.lineTo(w - w * pointPercent, h * 0.5);
			context.lineTo(w - w * pointPercent, h * shaftPercent * 0.5);
			context.lineTo(0, h * shaftPercent * 0.5);
			context.lineTo(0, -h * shaftPercent * 0.5);

			this.drawFillAndStroke(context, t, true, false);
		}
	}
});