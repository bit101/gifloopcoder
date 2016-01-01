define(function() {

	return {
		draw: function(context, t) {
			var x0 = this.getNumber("x0", t, 20),
				y0 = this.getNumber("y0", t, 10),
				x1 = this.getNumber("x1", t, 100),
				y1 = this.getNumber("y1", t, 200),
				x2 = this.getNumber("x2", t, 180),
				y2 = this.getNumber("y2", t, 10),
				showPoints = this.getBool("showPoints", t, false);


		    context.moveTo(x0, y0);
		    context.quadraticCurveTo(x1, y1, x2, y2);

			this.drawFillAndStroke(context, t, false, true);
			if(showPoints) {
				context.fillStyle = "black";
				context.fillRect(x0 - 2, y0 - 2, 4, 4);
				context.fillRect(x1 - 2, y1 - 2, 4, 4);
				context.fillRect(x2 - 2, y2 - 2, 4, 4);
			}
		}
	}
});
