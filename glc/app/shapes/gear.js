define(function() {
	
	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				radius = this.getNumber("radius", t, 50),
				toothHeight = this.getNumber("toothHeight", t, 10),
				hub = this.getNumber("hub", t, 10),
				rotation = this.getNumber("rotation", t, 0) * Math.PI / 180,
				teeth = this.getNumber("teeth", t, 10),
				toothAngle = this.getNumber("toothAngle", t, 0.3),
				face = 0.5 - toothAngle / 2,
				side = 0.5 - face,
				innerRadius = radius - toothHeight;

			context.translate(x, y);
			context.rotate(rotation);
			context.save();
			context.moveTo(radius, 0);
			var angle = Math.PI * 2 / teeth;

			for(var i = 0; i < teeth; i++) {
				context.rotate(angle * face);
				context.lineTo(radius, 0);
				context.rotate(angle * side);
				context.lineTo(innerRadius, 0);
				context.rotate(angle * face);
				context.lineTo(innerRadius, 0);
				context.rotate(angle * side);
				context.lineTo(radius, 0);
			}
			context.lineTo(radius, 0);
			context.restore();

			context.moveTo(hub, 0);
			context.arc(0, 0, hub, 0, Math.PI * 2, true);

			this.drawFillAndStroke(context, t, true, false);
		}
	}
});
