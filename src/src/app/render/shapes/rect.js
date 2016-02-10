define(function() {
	
	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				w = this.getNumber("w", t, 100),
				h = this.getNumber("h", t, 100),
                scaleX = this.getNumber("scaleX", t, 1),
                scaleY = this.getNumber("scaleY", t, 1);
				
			context.translate(x, y);
            context.scale(scaleX, scaleY);
			context.rotate(this.getNumber("rotation", t, 0) * Math.PI / 180);
			if(this.getBool("drawFromCenter", t, true)) {
				context.rect(-w * 0.5, -h * 0.5, w, h);
			}
			else {
				context.rect(0, 0, w, h);
			}

			this.drawFillAndStroke(context, t, true, false);
		}
	}
});
