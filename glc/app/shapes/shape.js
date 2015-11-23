define(["app/valueparser", "app/colorparser"], function(valueParser, colorParser) {

	return {
		styles: null,
		interpolation: null,

		create: function(type, props) {
			var obj = Object.create(this);
			obj.init(type, props || {});
			return obj;
		},

		init: function(type, props) {
			this.props = props;
			this.draw = type.draw;
		},

		render: function(context, t) {
			var t = this.interpolate(t);

			this.startDraw(context, t);
			this.draw(context, t);
			this.endDraw(context, t);
		},

		interpolate: function(t) {
			t += this.props.phase || 0;

		    switch(this.interpolation.mode) {
		    	case "bounce":
			    	if(this.interpolation.easing) {
				    	var a = t * Math.PI * 2;
					    return 0.5 - Math.cos(a) * 0.5;
			    	}
			    	else {
			    		t = t % 1;
			    		return t < 0.5 ? t * 2 : t = (1 - t) * 2;
			   		}
			   		break;

			   	case "single":
			   			if(t > 1) {
			   				t %= 1;
			   			}
			   		if(this.interpolation.easing) {
				    	var a = t * Math.PI;
					    return 0.5 - Math.cos(a) * 0.5;
			   		}
			   		else{
				    	return t;
			   		}
		    }

		},


		startDraw: function(context, t) {
			context.save();
			context.lineWidth = this.getNumber("lineWidth", t, this.styles.lineWidth);
			context.strokeStyle = this.getColor("strokeStyle", t, this.styles.strokeStyle);
			context.fillStyle = this.getColor("fillStyle", t, this.styles.fillStyle);
			context.lineCap = this.getString("lineCap", t, this.styles.lineCap);
			context.lineJoin = this.getString("lineJoin", t, this.styles.lineJoin);
			context.miterLimit = this.getString("miterLimit", t, this.styles.miterLimit);
			context.globalAlpha = this.getNumber("globalAlpha", t, this.styles.globalAlpha);
			context.translate(this.getNumber("translationX", t, this.styles.translationX), this.getNumber("translationY", t, this.styles.translationY));

			var shake = this.getNumber("shake", t, this.styles.shake);
			context.translate(Math.random() * shake - shake / 2, Math.random() * shake - shake / 2);

			var lineDash = this.getArray("lineDash", t, this.styles.lineDash);
			if(lineDash) {
				context.setLineDash(lineDash);
			}
			context.beginPath();
		},

		drawFillAndStroke: function(context, t, doFill, doStroke) {
			var fill = this.getBool("fill", t, doFill),
				stroke = this.getBool("stroke", t, doStroke);

			context.save();
			if(fill) {
				this.setShadowParams(context, t);
				context.fill();
			}
			context.restore();
			if(stroke) {
				if(!fill) {
					this.setShadowParams(context, t);
				}
				context.stroke();
			}
		},

		setShadowParams: function(context, t) {
			context.shadowColor = this.getColor("shadowColor", t, this.styles.shadowColor);
			context.shadowOffsetX = this.getNumber("shadowOffsetX", t, this.styles.shadowOffsetX);
			context.shadowOffsetY = this.getNumber("shadowOffsetY", t, this.styles.shadowOffsetY);
			context.shadowBlur = this.getNumber("shadowBlur", t, this.styles.shadowBlur);
		},

		endDraw: function(context) {
			context.restore();
		},

		getNumber: function(prop, t, def) {
			return valueParser.getNumber(this.props[prop], t, def);
		},

		getColor: function(prop, t, def) {
			return colorParser.getColor(this.props[prop], t, def);
		},

		getString: function(prop, t, def) {
			return valueParser.getString(this.props[prop], t, def);
		},

		getBool: function(prop, t, def) {
			return valueParser.getBool(this.props[prop], t, def);
		},

		getArray: function(prop, t, def) {
			return valueParser.getArray(this.props[prop], t, def);
		},

		getObject: function(prop, t, def) {
			return valueParser.getObject(this.props[prop], t, def);
		},

		getPosition: function(prop, t, def) {
			return valueParser.getPosition(this.props[prop], t, def);
		}
	}
});
