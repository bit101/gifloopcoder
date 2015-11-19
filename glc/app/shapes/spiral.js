define(function() {

	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, "100"),
				y = this.getNumber("y", t, "100"),
				innerRadius = this.getNumber("innerRadius", t, 10),
				outerRadius = this.getNumber("outerRadius", t, 90),
				turns = this.getNumber("turns", t, 6),
				res = this.getNumber("res", t, 1) * Math.PI / 180,
				fullAngle = Math.PI * 2 * turns;

			context.translate(x, y);
			context.rotate(this.getNumber("rotation", t, 0) * Math.PI / 180);


			if(fullAngle > 0) {
				for(var a = 0; a < fullAngle; a += res) {
					var r = innerRadius + (outerRadius - innerRadius) * a / fullAngle;
					context.lineTo(Math.cos(a) * r, Math.sin(a) * r);
				}
			}
			else {
				for(var a = 0; a > fullAngle; a -= res) {
					var r = innerRadius + (outerRadius - innerRadius) * a / fullAngle;
					context.lineTo(Math.cos(a) * r, Math.sin(a) * r);
				}
			}
			this.drawFillAndStroke(context, t, false, true);
		}
	};

});