define(function() {
	
	return {
		draw: function(context, t) {
			var x = this.getNumber("x", t, 100),
				y = this.getNumber("y", t, 100),
				text = this.getString("text", t, "hello"),
				fontSize = this.getNumber("fontSize", t, 20),
				fontWeight = this.getString("fontWeight", t, "normal");
				fontFamily = this.getString("fontFamily", t, "sans-serif");
				fontStyle = this.getString("fontStyle", t, "normal"),
                scaleX = this.getNumber("scaleX", t, 1),
                scaleY = this.getNumber("scaleY", t, 1);

			context.font = fontWeight + " " + fontStyle + " " + fontSize + "px " + fontFamily;
			var width = context.measureText(text).width;
			context.translate(x, y);
            context.scale(scaleX, scaleY);
			context.rotate(this.getNumber("rotation", t, 0) * Math.PI / 180);
			var shadowsSet = false;
			context.save();
			if(this.getBool("fill", t, true)) {
				this.setShadowParams(context, t);
				shadowsSet = true;
				context.fillText(text, -width / 2, fontSize * 0.4);
			}
			context.restore();
			if(this.getBool("stroke", t, false)) {
				if(!shadowsSet) {
					this.setShadowParams(context, t);
				}
				context.strokeText(text, -width / 2, fontSize * 0.4);
			}
		}
	}
});
