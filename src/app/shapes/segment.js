define(function() {
	
	return {
		draw: function(context, t) {
			var x0 = this.getNumber("x0", t, 0),
				y0 = this.getNumber("y0", t, 0),
				x1 = this.getNumber("x1", t, 100),
				y1 = this.getNumber("y1", t, 100),
				segmentLength = this.getNumber("segmentLength", t, 50),
				dx = x1 - x0,
			    dy = y1 - y0,
			    angle = Math.atan2(dy, dx),
			    dist = Math.sqrt(dx * dx + dy * dy),
		    	start = -0.01,
		    	end = (dist + segmentLength) * t;

		    if(end > segmentLength) {
		      start = end - segmentLength;
		    }
		    if(end > dist) {
		      end = dist + 0.01;
		    }

		    context.translate(x0, y0);
		    context.rotate(angle);
			context.moveTo(start, 0);
			context.lineTo(end, 0);

			this.drawFillAndStroke(context, t, false, true);
		}
	}
});
