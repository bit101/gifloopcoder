define(function() {

	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				radius = this.getNumber("radius", t, 50),
				startAngle = this.getNumber("startAngle", t, 0),
				endAngle = this.getNumber("endAngle", t, 360);

			if(startAngle > endAngle) {
				var temp = startAngle;
				startAngle = endAngle;
				endAngle = temp;
			}
			var arc = this.getNumber("arc", t, 20),
				start = startAngle - 1,
				end = startAngle + t * (endAngle - startAngle + arc);

			if(end > startAngle + arc) {
				start = end - arc;
			}
			if(end > endAngle) {
				end = endAngle + 1;
			}

			context.translate(x, y);
			context.rotate(this.getNumber("rotation", t, 0) * Math.PI / 180);
			context.arc(0, 0, radius, start * Math.PI / 180, end * Math.PI / 180);

			this.drawFillAndStroke(context, t, false, true);		
		}
	}
});
