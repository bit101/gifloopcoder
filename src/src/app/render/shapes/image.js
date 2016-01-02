define(function() {
	
	return {
		init: function() {
			this.image = document.createElement("img");
			this.image.src = this.props.url;
			document.body.appendChild(this.image);
		},
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				w = this.getNumber("w", t, this.image.width),
				h = this.getNumber("h", t, this.image.height),
				widthScale = w/this.image.width,
				heightScale = h/this.image.height;

			context.save();
			context.translate(x, y);
			context.rotate(this.getNumber("rotation", t, 0) * Math.PI / 180);
			context.save();
			context.scale(widthScale, heightScale);
			context.drawImage(this.image, -w / widthScale * 0.5, -h / heightScale * 0.5);
			context.restore();
			this.drawFillAndStroke(context, t, true, false);
			context.restore();
		}
	}
});
