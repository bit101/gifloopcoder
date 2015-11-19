define(function() {

	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				radius = this.getNumber("radius", t, 50),
				startAngle = this.getNumber("startAngle", t, 0),
				endAngle = this.getNumber("endAngle", t, 360);

			context.translate(x, y);
			context.rotate(this.getNumber("rotation", t, 0) * Math.PI / 180);
			context.arc(0, 0, radius, startAngle * Math.PI / 180, endAngle * Math.PI / 180);

			this.drawFillAndStroke(context, t, true, false);
		}
	}
});
