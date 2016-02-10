define(function() {
	
	return {
		draw: function(context, t) {
			var image = this.getObject("image", t, null),
				x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				w = this.getNumber("w", t, -1),
				h = this.getNumber("h", t, -1),
			    rotation = this.getNumber("rotation", t, 0) * Math.PI / 180,
			    drawFromCenter = this.getBool("drawFromCenter", t, true),
			    smooth = this.getBool("smooth", t, true),
                scaleX = this.getNumber("scaleX", t, 1),
                scaleY = this.getNumber("scaleY", t, 1);


		    context.translate(x, y);
            context.scale(scaleX, scaleY);
		    context.rotate(rotation);
		    if(w === -1) {
		    	w = image.width;
		    }
		    if(h === -1) {
		    	h = image.height;
		    }
		    context.imageSmoothingEnabled = smooth;
		    context.mozImageSmoothingEnabled = smooth;
 			context.msImageSmoothingEnabled = smooth
		    this.setShadowParams(context, t);
		    if(drawFromCenter) {
			    context.drawImage(image, -w / 2, -h / 2, w, h);
			}
			else {
			    context.drawImage(image, 0, 0, w, h);
			}
		}
	}
});
