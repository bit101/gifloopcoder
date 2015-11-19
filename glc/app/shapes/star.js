define(function() {
	
	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				innerRadius = this.getNumber("innerRadius", t, 25),
				outerRadius = this.getNumber("outerRadius", t, 50),
				rotation = this.getNumber("rotation", t, 0) * Math.PI / 180,
				points = this.getNumber("points", t, 5);

			context.translate(x, y);
			context.rotate(rotation);
			context.moveTo(outerRadius, 0);
			for(var i = 1; i < points * 2; i++) {
				var angle = Math.PI * 2 / points / 2 * i,
					r = i % 2 ? innerRadius : outerRadius;
				context.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
			}
			context.lineTo(outerRadius, 0);


			this.drawFillAndStroke(context, t, true, false);	
		}
	}
});
