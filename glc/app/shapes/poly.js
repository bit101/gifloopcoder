define(function() {
	
	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				radius = this.getNumber("radius", t, 50),
				rotation = this.getNumber("rotation", t, 0) * Math.PI / 180,
				sides = this.getNumber("sides", t, 5);

			context.translate(x, y);
			context.rotate(rotation);
			context.moveTo(radius, 0);
			for(var i = 1; i < sides; i++) {
				var angle = Math.PI * 2 / sides * i;
				context.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
			}
			context.lineTo(radius, 0);

			this.drawFillAndStroke(context, t, true, false);
		}
	}
});
		
