define(function() {

	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				rx = this.getNumber("rx", t, 50),
				ry = this.getNumber("ry", t, 50),
				startAngle = this.getNumber("startAngle", t, 0),
				endAngle = this.getNumber("endAngle", t, 360),
				drawFromCenter = this.getBool("drawFromCenter", t, false),
                scaleX = this.getNumber("scaleX", t, 1),
                scaleY = this.getNumber("scaleY", t, 1);

			// guard against negative radii, which will break.
			// alternate handling: Math.max(rx, 0);
			// this seems more useful
			rx = Math.abs(rx);
			ry = Math.abs(ry);

			context.translate(x, y);
            context.scale(scaleX, scaleY);
			context.rotate(this.getNumber("rotation", t, 0) * Math.PI / 180);
			context.save();
			context.scale(rx / 100, ry / 100);
			if(drawFromCenter) {
				context.moveTo(0, 0);
			}
			context.arc(0, 0, 100, startAngle * Math.PI / 180, endAngle * Math.PI / 180);
			if(drawFromCenter) {
				context.closePath();
			}
			context.restore();

			this.drawFillAndStroke(context, t, true, false);
		}
	}
});
