define(function() {
	
	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 0),
				y = this.getNumber("y", t, 0),
				w = this.getNumber("w", t, 100),
				h = this.getNumber("h", t, 100),
				gridSize = this.getNumber("gridSize", t, 20);
				
			for(var i = y; i <= y + h; i += gridSize) {
				context.moveTo(x, i);
				context.lineTo(x + w, i);
			}
			for(i = x; i <= x + w; i += gridSize) {
				context.moveTo(i, y);
				context.lineTo(i, y + h);
			}

			this.drawFillAndStroke(context, t, false, true);		
		}
	}
});
