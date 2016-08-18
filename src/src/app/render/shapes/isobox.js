define(function() {
	
	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				size = this.getNumber("size", t, 60),
				h = this.getNumber("h", t, 40),
				colorLeft = this.getColor("colorLeft", t, "#999999"),
				colorRight = this.getColor("colorRight", t, "#cccccc"),
				colorTop = this.getColor("colorTop", t, "#eeeeee"),
                scaleX = this.getNumber("scaleX", t, 1),
                scaleY = this.getNumber("scaleY", t, 1);
				
			context.translate(x, y);
            context.scale(scaleX, scaleY);

			if(h >= 0) {
				context.fillStyle = colorTop;
				context.beginPath();
				context.moveTo(-size / 2, -h);
				context.lineTo(0, -size / 4 - h);
				context.lineTo(size / 2, -h);
				context.lineTo(size / 2, -1);
				context.lineTo(0, size / 4 - 1);
				context.lineTo(-size / 2, -1);				
				context.lineTo(-size / 2, -h);
				this.drawFillAndStroke(context, t, true, false);

				context.fillStyle = colorLeft;
				context.beginPath();
				context.moveTo(-size / 2, 0);
				context.lineTo(0, size / 4);
				context.lineTo(0, size / 4 - h);
				context.lineTo(-size / 2, -h);
				context.lineTo(-size / 2, 0);
				this.drawFillAndStroke(context, t, true, false);

				context.fillStyle = colorRight;
				context.beginPath();
				context.moveTo(size / 2, 0);
				context.lineTo(0, size / 4);
				context.lineTo(0, size / 4 - h);
				context.lineTo(size / 2, -h);
				context.lineTo(size / 2, 0);
				this.drawFillAndStroke(context, t, true, false);
			}
			else {
				// clip path
				context.beginPath();
				context.moveTo(-size / 2, 0);
				context.lineTo(0, -size / 4);
				context.lineTo(size / 2, 0);
				context.lineTo(0, size / 4);
				context.lineTo(-size / 2, 0);
				context.clip();


				context.fillStyle = colorRight;
				context.beginPath();
				context.moveTo(-size / 2, 0);
				context.lineTo(0, -size / 4);
				context.lineTo(0, -size / 4 -h);
				context.lineTo(-size / 2, -h);
				context.lineTo(-size / 2, 0);
				this.drawFillAndStroke(context, t, true, false);

				context.fillStyle = colorLeft;
				context.beginPath();
				context.moveTo(size / 2, 0);
				context.lineTo(0, -size / 4);
				context.lineTo(0, -size / 4 -h);
				context.lineTo(size / 2, -h);
				context.lineTo(size / 2, 0);
				this.drawFillAndStroke(context, t, true, false);

				context.fillStyle = colorTop;
				context.beginPath();
				context.moveTo(-size / 2, -h);
				context.lineTo(0, -size / 4 - h);
				context.lineTo(size / 2, -h);
				context.lineTo(0, size / 4 - h);
				context.lineTo(-size / 2, -h);
				this.drawFillAndStroke(context, t, true, false);
			}


		}
	}
});
