define(function() {
	
	return {
		draw: function(context, t) {
			var x0 = this.getNumber("x0", t, 0),
				y0 = this.getNumber("y0", t, 0),
				x1 = this.getNumber("x1", t, 100),
				y1 = this.getNumber("y1", t, 100);
				
			context.moveTo(x0, y0);
			context.lineTo(x1, y1);

			this.drawFillAndStroke(context, t, false, true);		
		}
	}
});
