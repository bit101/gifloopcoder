define(function() {
	
	return {
		draw: function(context, t) {
			var path = this.getArray("path", t, []),
				startPercent = this.getNumber("startPercent", t, 0),
				endPercent = this.getNumber("endPercent", t, 1),
				startPoint = Math.floor(path.length / 2 * startPercent),
				endPoint = Math.floor(path.length / 2 * endPercent),
				startIndex = startPoint * 2,
				endIndex = endPoint * 2;

			if(startIndex > endIndex) {
				var temp = startIndex;
				startIndex = endIndex;
				endIndex = temp;
			}

		    context.moveTo(path[startIndex], path[startIndex + 1]);

		    for(var i = startIndex + 2; i < endIndex - 1; i += 2) {
		    	context.lineTo(path[i], path[i + 1]);
		    }

			this.drawFillAndStroke(context, t, false, true);		}
	}
});
