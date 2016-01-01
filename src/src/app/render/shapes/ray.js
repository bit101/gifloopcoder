define(function() {
	
	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				angle = this.getNumber("angle", t, 0) * Math.PI / 180,
				length = this.getNumber("length", t, 100);
				
			context.translate(x, y);
			context.rotate(angle);
			context.moveTo(0, 0);
			context.lineTo(length, 0);

			this.drawFillAndStroke(context, t, false, true);
		}
	}
});
