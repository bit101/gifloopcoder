define(function() {
	
	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				angle = this.getNumber("angle", t, 0) * Math.PI / 180,
				length = this.getNumber("length", t, 100),
				segmentLength = this.getNumber("segmentLength", t, 50),				
		    	start = -0.01,
		    	end = (length + segmentLength) * t;

		    if(end > segmentLength) {
		      start = end - segmentLength;
		    }
		    if(end > length) {
		      end = length + 0.01;
		    }

		    context.translate(x, y);
		    context.rotate(angle);
			context.moveTo(start, 0);
			context.lineTo(end, 0);

			this.drawFillAndStroke(context, t, false, true);
		}
	}
});
